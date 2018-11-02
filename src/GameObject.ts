import { IGameObject } from "./compiler/types";
import { Container, Graphics } from "pixi.js";
import { Body } from "cannon";

export default class GameObject implements IGameObject {
  _x: number = 0;
  _y: number = 0;
  gameObjects: Array<IGameObject> = [];
  container: Container;
  debugContainer: Container;
  rigidBody?: Body;

  constructor() {
    this.container = new Container();
    this.debugContainer = new Container();
    
    let rectGraphic = new Graphics();
    rectGraphic.lineStyle(2, 0xFF3300, 1);
    rectGraphic.beginFill(0x0);
    rectGraphic.drawRect(0, 0, 16, 16);
    rectGraphic.endFill();
    rectGraphic.x = this.x;
    rectGraphic.y = this.y;
    // rectGraphic.pivot.set(8, 8);
    this.debugContainer.addChild(rectGraphic);

    this.container.addChild(this.debugContainer);
  }

  public get x() { return this._x; }
  public get y() { return this._y; }

  public set x(x: number) {
    this._x = x;
    this.container.x = x;
    if(this.rigidBody) {
      this.rigidBody.position.x = x;
    }
  }

  public set y(y: number) {
    this._y = y;
    this.container.y = y;
    if(this.rigidBody) {
      this.rigidBody.position.y = y;
    }
  }

  public addChild(gameObject: IGameObject) {
    this.gameObjects.push(gameObject);

    if(this.container) {
      this.container.addChild(gameObject.container!!);
    }
  }

  public update(deltaTime: number) {
    if(this.rigidBody) {
      this.x = this.rigidBody.position.x;
      this.y = this.rigidBody.position.y;
    }

    this.gameObjects.forEach((g: IGameObject) => {
      g.update(deltaTime);
    });
  }
}