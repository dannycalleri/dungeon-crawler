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
        .map((gameObject: IGameObject) => (
          {x: gameObject.x, y: gameObject.y}
        ))
    );
    console.log(triangles);

    const graph: Graph = createGraph([
      '1337',
      '1338',
      '1339',
    ]);
    console.log(graph.vertices);
  }

  private triangulate(points: Point[]): any {
    const delaunator = Delaunator.from(points.map((point: Point) => ([point.x, point.y])));
    const triangles = delaunator.triangles;
    const coordinates = [];
    for (let i = 0; i < triangles.length; i += 3) {
      coordinates.push([
        points[triangles[i]],
        points[triangles[i + 1]],
        points[triangles[i + 2]]
      ]);
    }
    return coordinates;
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