import { Container, Rectangle } from "pixi.js";
import { getRandomPointInCircle, roundToNum } from "./functions";
import { Point } from "../compiler/types";

class Dungeon {
  private rooms: Array<Rectangle> = [];
  private numberOfRooms: number;
  private radius: number;
  private container: Container = new Container();

  public constructor(numberOfRooms: number, radius: number) {
    this.numberOfRooms = numberOfRooms;
    this.radius = radius;
  }

  public getGraphics(): Container { return this.container; }

  public generate(): Dungeon {
    const rooms: Array<Rectangle> = [];

    for(let i=0; i < this.numberOfRooms; i++) {
      const point: Point = getRandomPointInCircle(this.radius);
      const rect = new Rectangle(
        point.x,
        point.y,
        roundToNum(50 + (50 * Math.random()), 32),
        roundToNum(50 + (50 * Math.random()), 32),
      );
      this.rooms.push(rect);
  
      let rectGraphic = new PIXI.Graphics();
      rectGraphic.lineStyle(4, 0xFF3300, 1);
      rectGraphic.beginFill(0x66CCFF);
      rectGraphic.drawRect(0, 0, rect.width, rect.height);
      rectGraphic.endFill();
      rectGraphic.x = rect.x;
      rectGraphic.y = rect.y;
      this.container.addChild(rectGraphic);
    }

    return this;
  }
}

export default Dungeon;