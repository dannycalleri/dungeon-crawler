import * as PIXI from "pixi.js";
import {physicsWorld} from './Physics';
import Dungeon from "./generation/Dungeon";
import Room from "./Room";
import Game from './Game';
import Scene from "./Scene";

import SpriteSheet from '../images/spritesheet.png';
import GameObject from "./GameObject";

const game = new Game();
const resources = new Map<string, string>();
resources.set('spriteSheet', SpriteSheet);

const scene = new Scene();
const gameObject = new GameObject();
scene.addChild(gameObject);

const room: Room = new Room(10,10,100,100);
const room2: Room = new Room(10,40,100,100);
scene.addChild(room);
scene.addChild(room2);

game.currentScene = scene;

game.loadResources(resources)
  .then((data) => {
    game.currentScene = scene;
    game.startLoop();
  });