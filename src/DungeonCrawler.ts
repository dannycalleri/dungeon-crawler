import Delaunator from 'delaunator';
import {Graph, createGraph} from 'ture';
import Game from './Game';
import Scene from './Scene';
import Room from './Room';
import { Rectangle, IGameObject, Point } from './compiler/types';
import { generateDungeon, selectSuitableRooms } from './generation/dungeon';
import { areNumbersEqual } from './math';

export default class DungeonCrawler extends Game {
  public constructor() {
    super();
    this.setup();
  }

  private async setup(): Promise<void> {
    const scene = new Scene();
    this.currentScene = scene;

    scene.pivot = {
      x: -this.width / 2,
      y: -this.height / 2,
    };

    const rectangles: Rectangle[] = generateDungeon(50);
    const suitable: Rectangle[] = selectSuitableRooms(rectangles);

    // I'd like all of the rooms to be visible at the moment
    rectangles.forEach((rect: Rectangle) => {
      const suitableRoom = suitable.filter((suitableRoom: Rectangle) => {
        return areNumbersEqual(suitableRoom.x, rect.x) &&
          areNumbersEqual(suitableRoom.y, rect.y) &&
          areNumbersEqual(suitableRoom.width, rect.width) &&
          areNumbersEqual(suitableRoom.height, rect.height);
      })[0];

      if(suitableRoom) {
        scene.addChild(
          new Room(rect.x, rect.y, rect.width, rect.height, true),
        );
      } else {
        scene.addChild(
          new Room(rect.x, rect.y, rect.width, rect.height)
        );
      }
    });

    await this.waitForAllBodiesToSleep();
    const triangles = this.triangulate(
      this.currentScene.gameObjects
        .filter((gameObject: IGameObject) => (gameObject as Room).isSuitable)
    );
    console.log(triangles);

    const graph: Graph = createGraph([
      '1337',
      '1338',
      '1339',
    ]);
    console.log(graph.vertices);
  }

  private triangulate(gameObjects: IGameObject[]): any {
    const delaunator = Delaunator.from(gameObjects.map((gameObject: IGameObject) => ([gameObject.x, gameObject.y])));
    const triangleIndices = delaunator.triangles;
    const triangles = [];
    for (let i = 0; i < triangleIndices.length; i += 3) {
      triangles.push([
        gameObjects[triangleIndices[i]],
        gameObjects[triangleIndices[i + 1]],
        gameObjects[triangleIndices[i + 2]]
      ]);
    }
    return triangles;
  }

  private waitForAllBodiesToSleep(): Promise<void> {
    return new Promise((res) => {
      const id = setInterval(() => {
        const all = this.currentScene.gameObjects;
        const sleeping = all.reduce((acc: boolean, gameObject: IGameObject) => {
          const sleeping = gameObject.rigidBody ? gameObject.rigidBody.isSleeping : true;
          return acc && sleeping;
        }, true);
        console.log(`SLEEPING = ${sleeping}`);
        if(sleeping) {
          clearInterval(id);
          res();
        }
      });
    });
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);
  }
}