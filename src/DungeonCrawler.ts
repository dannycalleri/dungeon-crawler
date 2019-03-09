import Game from './Game';
import Scene from './Scene';
import Room from './Room';
import { Rectangle } from './compiler/types';
import { generateDungeon } from './generation/dungeon';

export default class DungeonCrawler extends Game {
  public constructor() {
    super();
    this.setup();
  }

  private setup(): void {
    const scene = new Scene();
    scene.pivot = {
      x: -this.width / 2,
      y: -this.height / 2,
    };

    const rectangles: Rectangle[] = generateDungeon(20);
    rectangles.forEach((rect: Rectangle) => {
      scene.addChild(
        new Room(rect.x, rect.y, rect.width, rect.height)
      );
    });

    this.currentScene = scene;
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);
  }
}