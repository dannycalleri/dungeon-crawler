import { Body } from "cannon";
import { Container } from "pixi.js";

export interface IGame {
  currentScene: IScene;
  scenes: Map<string, IScene>;
  loadResources: Function;
  update(deltaTime: number): void;
}

export interface IScene {
  container?: Container;
  gameObjects: Array<IGameObject>;
  update(deltaTime: number): void;
}

export interface IGameObject {
  x: number;
  y: number;
  rigidBody?: Body;
  container?: Container;
  // this container is used only for debug purposes
  debugContainer?: Container;
  update(deltaTime: number): void;
}

export interface Point {
  x: number;
  y: number;
}
