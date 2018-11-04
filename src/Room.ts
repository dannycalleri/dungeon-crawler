import { Graphics } from "pixi.js";
import {world, engine} from "./Physics";
import GameObject from "./GameObject";
import { Bodies } from "matter-js";

class Room extends GameObject {
  private width:number = 0;
  private height:number = 0;
  private isColliding: Boolean;

  public constructor(x: number, y: number, width: number, height: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
    let rectGraphic = new Graphics();
    rectGraphic.lineStyle(4, 0xFF3300, 1);
    rectGraphic.beginFill(0x0, 0);
    rectGraphic.drawRect(0, 0, width, height);
    rectGraphic.endFill();
    rectGraphic.x = 0;
    rectGraphic.y = 0;
    this.container.addChild(rectGraphic);

    const body = Bodies.rectangle(x, y, width, height);
    // body.fixedRotation = true;
    this.rigidBody = body;
    world.add(engine.world, body);
  }

  public getRigidBody() { return this.rigidBody; }
  public getWidth() { return this.width; }
  public getHeight() { return this.height; }

  public update(deltaTime: number) {
    super.update(deltaTime);
    // this.rigidBody.velocity.setZero();
    // this.rigidBody.force.setZero();
  }
}

export default Room;
