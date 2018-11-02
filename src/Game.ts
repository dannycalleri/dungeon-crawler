import * as PIXI from "pixi.js";
import { IGame, IScene } from "./compiler/types";
import { physicsWorld } from "./Physics";

export default class Game implements IGame {
  private _currentScene: IScene;
  scenes: Map<string, IScene>;
  app: PIXI.Application;

  constructor() {
    this.app = new PIXI.Application({width: 800, height: 600});
    document.body.appendChild(this.app.view);
  }

  public get currentScene() {
    return this._currentScene;
  }

  public set currentScene(scene: IScene) {
    if(this._currentScene) {
      this.app.stage.removeChild(this._currentScene.container);
    }

    this.app.stage.addChild(scene.container);
    this._currentScene = scene;
  }

  public startLoop() {
    const fixedTimeStep:number = 1.0 / 60.0; // seconds
    const maxSubSteps: number = 3;
    const update: Function = this.update.bind(this);
    let lastTime: number;

    (function loop(time: number) {
      requestAnimationFrame(loop);
      let deltaTime: number = 0;
      if(lastTime !== undefined){
        deltaTime = (time - lastTime) / 1000;
        physicsWorld.step(fixedTimeStep, deltaTime, maxSubSteps);
      }
      
      update(deltaTime);
      lastTime = time;
    })(0);
  }

  public loadResources(resources: Map<string, string>) {
    const resourceArray = [...resources].map(row => ({
      name: row[0],
      url: row[1],
    }));
    return new Promise((res, rej) => {
      PIXI.loader
        .add(resourceArray)
        .on("progress", this.loadProgressHandler)
        .load((loader: any, resources: any) => {
          res({
            loader, 
            resources,
          });
        });
    });
  }

  public update(deltaTime: number) {
    this._currentScene.update(deltaTime);
  }

  private loadProgressHandler (loader: any, resource: any) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%");
  }
}
