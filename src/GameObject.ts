import { IGameObject } from "./compiler/types";

class GameObject implements IGameObject {
  x: number = 0;
  y: number = 0;

  public update() {
  }
}