import * as PIXI from "pixi.js";
import SpriteSheet from '../images/spritesheet.png';
import Dungeon from "./generation/Dungeon";

//Create a Pixi Application
let app = new PIXI.Application({width: 800, height: 600});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// load the texture we need
PIXI.loader
.add(
  'spriteSheet', SpriteSheet
)
.on("progress", loadProgressHandler)
.load((loader: any, resources: any) => {
  let texture = PIXI.utils.TextureCache["spriteSheet"];
  let renderRectangle = new PIXI.Rectangle(0, 0, 16, 16);
  texture.frame = renderRectangle;

  let rocket = new PIXI.Sprite(texture);
  rocket.x = 32;
  rocket.y = 32;
  app.stage.addChild(rocket);

  let texture2:PIXI.Texture = PIXI.utils.TextureCache["spriteSheet"].clone();
  const sprite = new PIXI.Sprite(texture2);
  let renderRectangleSprite2 = new PIXI.Rectangle(16, 16, 16, 16);
  texture.frame = renderRectangleSprite2;

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

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    sprite.rotation += 0.01;
  });
});

function loadProgressHandler(loader: any, resource: any) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%");
}