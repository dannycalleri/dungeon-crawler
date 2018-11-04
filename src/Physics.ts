import { World, Vec2 } from 'planck-js';

const physicsWorld = World({
  gravity: Vec2(0, 0)
});

export {
  physicsWorld,
};
