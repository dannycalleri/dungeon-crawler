import { Graphics } from "pixi.js";
import { Body, Vec3, Box } from "cannon";
import {physicsWorld} from "./Physics";

class Room {
  private x:number = 0;
  private y:number = 0;
  private width:number = 0;
  private height:number = 0;
  private graphics: Graphics;
  private rigidBody: Body;
  private isColliding: Boolean;

  public constructor(x: number, y: number, width: number, height: number) {
    this.width = width;
    this.height = height;
    
    let rectGraphic = new Graphics();
    rectGraphic.lineStyle(4, 0xFF3300, 1);
    rectGraphic.beginFill(0x66CCFF);
    rectGraphic.drawRect(0, 0, width, height);
    rectGraphic.endFill();
    rectGraphic.x = x;
    rectGraphic.y = y;
    this.graphics = rectGraphic;

    const body = new Body({
      mass: 1, // kg
      position: new Vec3(x, y, 0), // m
      shape: new Box(new Vec3(width/2, height/2, 100)),
    });
    body.fixedRotation = true;
    // body.collisionResponse = false;
    this.rigidBody = body;
    physicsWorld.addBody(body);
  }

  public getRigidBody() { return this.rigidBody; }
  public getGraphics() { return this.graphics; }
  public getWidth() { return this.width; }
  public getHeight() { return this.height; }

  public update() {
    this.rigidBody.velocity.setZero();
  }
}

export default Room;
