import Game from './Game';
import Scene from './Scene';
import Room from './Room';
import { getRandomPointInCircle, roundToNum } from './generation/functions';
import { Point } from './compiler/types';

export default class DungeonCrawler extends Game {
  constructor() {
    super();
    this.setup();
  }

  private setup() {
    const scene = new Scene();
    scene.pivot = {
      x: -this.width / 2,
      y: -this.height / 2,
    };

    for(let i=0; i < 20; i++) {
      const point: Point = getRandomPointInCircle(100);
      const room = new Room(
        point.x,
        point.y,
        64,
        64
      );
      scene.addChild(room);
    }

    this.currentScene = scene;
  }

  public update(deltaTime: number) {
    super.update(deltaTime);
  }
}