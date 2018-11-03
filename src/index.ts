import DungeonCrawler from './DungeonCrawler';

import SpriteSheet from '../images/spritesheet.png';

const game = new DungeonCrawler();
const resources = new Map<string, string>();
resources.set('spriteSheet', SpriteSheet);

game.loadResources(resources)
  .then((data) => {
    game.startLoop();
  });