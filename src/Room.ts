import { Graphics } from "pixi.js";
import { Vec2, Box } from "planck-js";
import {physicsWorld} from "./Physics";
import GameObject from "./GameObject";

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

    // const body = new Body({
    //   mass: 5, // kg
    //   position: new Vec3(x, y, 0), // m
    //   shape: new Box(new Vec3(Math.ceil(width/2), Math.ceil(height/2), 100)),
    // });
    const body = physicsWorld.createBody().setDynamic();
    body.createFixture(Box(width/2, height/2));
    body.setPosition(Vec2(x, y));
    body.setMassData({
      mass : 1,
      center : Vec2(),
      I : 1
    });
    // body.fixedRotation = true;
    // body.collisionResponse = false;
    this.rigidBody = body;
    // physicsWorld.addBody(body);
    console.log(this.rigidBody);
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
