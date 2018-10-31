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
  //Create the sprite from the texture
  let rocket = new PIXI.Sprite(texture);

  //Position the rocket sprite on the canvas
  rocket.x = 32;
  rocket.y = 32;

  //Add the rocket to the stage
  app.stage.addChild(rocket);

  //Tell the texture to use that rectangular section
  //texture.frame = rectangle;

  // This creates a texture from a 'bunny.png' image
  let texture2:PIXI.Texture = PIXI.utils.TextureCache["spriteSheet"].clone();
  const sprite = new PIXI.Sprite(texture2);
  let renderRectangleSprite2 = new PIXI.Rectangle(16, 16, 16, 16);
  texture.frame = renderRectangleSprite2;

  // Setup the position of the bunny
  sprite.x = app.renderer.width / 2;
  sprite.y = app.renderer.height / 2;

  // Rotate around the center
  sprite.anchor.x = 0.5;
  sprite.anchor.y = 0.5;

  // Add the bunny to the scene we are building
  app.stage.addChild(sprite);

  const dungeon = new Dungeon(20, 300);
  const graphics = dungeon
    .generate()
    .getGraphics();
  graphics.pivot.set(-app.renderer.width/2, -app.renderer.height/2);
  app.stage.addChild(graphics);

  // let rectangle = new PIXI.Graphics();
  // rectangle.lineStyle(4, 0xFF3300, 1);
  // rectangle.beginFill(0x66CCFF);
  // rectangle.drawRect(0, 0, 64, 64);
  // rectangle.endFill();
  // rectangle.x = 170;
  // rectangle.y = 170;
  // app.stage.addChild(rectangle);

  // let style = new PIXI.TextStyle({
  //   fontFamily: "Arial",
  //   fontSize: 36,
  //   fill: "white",
  //   stroke: '#ff3300',
  //   strokeThickness: 4,
  //   dropShadow: true,
  //   dropShadowColor: "#000000",
  //   dropShadowBlur: 4,
  //   dropShadowAngle: Math.PI / 6,
  //   dropShadowDistance: 6,
  // });
  // let message = new PIXI.Text("Hello Pixi!", style);
  // app.stage.addChild(message);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    sprite.rotation += 0.01;
  });
});

function loadProgressHandler(loader: any, resource: any) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url); 

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%"); 

  //If you gave your files names as the first argument 
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}