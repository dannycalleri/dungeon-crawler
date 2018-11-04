import { Container } from "pixi.js";

export interface IGame {
  currentScene: IScene;
  scenes: Map<string, IScene>;
  loadResources: Function;
  update(deltaTime: number): void;
}

export interface IScene {
  x: number;
  y: number;
  container: Container;
  gameObjects: Array<IGameObject>;
  addChild(gameObject: IGameObject): void;
  update(deltaTime: number): void;
}

export interface IGameObject {
  x: number;
  y: number;
  gameObjects: Array<IGameObject>;
  // the following should be a body object by planck
  rigidBody?: any;
  container?: Container;
  // this container is used only for debug purposes
  debugContainer: Container;
  addChild(gameObject: IGameObject): void;
  update(deltaTime: number): void;
}

export interface Point {
  x: number;
  y: number;
}
