import * as CANNON from "cannon";

const physicsWorld = new CANNON.World();
physicsWorld.gravity.set(0, 0, 0);

export {
  physicsWorld,
};
