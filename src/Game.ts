import { IGame, IScene } from "./compiler/types";

class Game implements IGame {
  currentScene: IScene;
  scenes: Map<string, IScene>;

  public loadResources(resources: Map<string, string>) {
    return new Promise((res, rej) => {
      PIXI.loader
        .add(...resources)
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
    this.currentScene.update(deltaTime);
  }

  private loadProgressHandler (loader: any, resource: any) {
    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%");
  }
}
