import { 
  IScene, 
  IGameObject 
} from "./compiler/types";
import { Container } from "pixi.js";

export default class Scene implements IScene {
  _x: number = 0;
  _y: number = 0;
  gameObjects: Array<IGameObject> = [];
  container: Container;

  constructor() {
    this.container = new Container();
  }

  public get x() { return this._x; }
  public get y() { return this._y; }

  public set x(x: number) {
    this._x = x;
    this.container.x = x;
  }

  public set y(y: number) {
    this._y = y;
    this.container.y = y;
  }

  public addChild(gameObject: IGameObject) {
    this.gameObjects.push(gameObject);
    this.container.addChild(gameObject.container!!);
  }

  public update(deltaTime: number) {
    this.gameObjects.forEach((g: IGameObject) => {
      g.update(deltaTime);
    });
  }
}