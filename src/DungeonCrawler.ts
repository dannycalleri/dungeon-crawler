import Game from './Game';
import Scene from './Scene';
import Room from './Room';
import { getRandomPointInCircle, roundToNum } from './generation/functions';
import { Point } from './compiler/types';

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

    for(let i=0; i < 40; i++) {
      const point: Point = getRandomPointInCircle(100);
      const room = new Room(
        point.x,
        point.y,
        32 + roundToNum(Math.floor(Math.random() * 64), 32),
        32 + + roundToNum(Math.floor(Math.random() * 64), 32),
      );
      scene.addChild(room);
    }

    this.currentScene = scene;
  }

  public update(deltaTime: number): void {
    super.update(deltaTime);
  }
}