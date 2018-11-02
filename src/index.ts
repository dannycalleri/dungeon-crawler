import * as PIXI from "pixi.js";
import * as CANNON from "cannon";
import {physicsWorld} from './Physics';
import Dungeon from "./generation/Dungeon";
import Room from "./Room";

import SpriteSheet from '../images/spritesheet.png';

let app = new PIXI.Application({width: 800, height: 600});
document.body.appendChild(app.view);

PIXI.loader
.add(
  'spriteSheet', SpriteSheet
)
.on("progress", loadProgressHandler)
.load((loader: any, resources: any) => {
  let texture = PIXI.utils.TextureCache["spriteSheet"];
  let renderRectangle = new PIXI.Rectangle(0, 0, 16, 16);
  texture.frame = renderRectangle;

  const sprite = new PIXI.Sprite(texture);
  sprite.x = app.renderer.width / 2;
  sprite.y = app.renderer.height / 2;
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;
  app.stage.addChild(sprite);

  const dungeon = new Dungeon(20, 300);
  const graphics = dungeon
    .generate()
    .getGraphics();
  graphics.pivot.set(-app.renderer.width/2, -app.renderer.height/2);
  app.stage.addChild(graphics);

  const room: Room = new Room(10,10,100,100);
  const room2: Room = new Room(10,40,100,100);
  app.stage.addChild(room.getGraphics());
  app.stage.addChild(room2.getGraphics());

  const fixedTimeStep = 1.0 / 60.0; // seconds
  const maxSubSteps = 3;

  // Start the simulation loop
  let lastTime: number;
  (function simloop(time: number){
    requestAnimationFrame(simloop);
    if(lastTime !== undefined){
      var dt = (time - lastTime) / 1000;
      physicsWorld.step(fixedTimeStep, dt, maxSubSteps);
    }
    
    lastTime = time;

    let roomGraphics = room.getGraphics();
    let roomRigidBody = room.getRigidBody();
    roomGraphics.position.x = roomRigidBody.position.x;
    roomGraphics.position.y = roomRigidBody.position.y;

    let roomGraphics2 = room2.getGraphics();
    let roomRigidBody2 = room2.getRigidBody();
    roomGraphics2.position.x = roomRigidBody2.position.x;
    roomGraphics2.position.y = roomRigidBody2.position.y;

    room.update();
    room2.update();

    // each frame we spin the bunny around a bit
    sprite.rotation += 0.01;
  })(0);
});

function loadProgressHandler(loader: any, resource: any) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%");
}