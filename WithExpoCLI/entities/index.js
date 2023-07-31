import Matter from "matter-js";
import Birds from "../src/components/Birds";

export default (restart) => {
  let engine = Matter.Engine.create({ enableSleeping: false });

  let world = engine.world;

  world.gravity.y = 0.4;

  return {
    physics: { engine, world },
    Bird: Birds(world, "green", { x: 50, y: 300 }, { height: 40, width: 40 }),
  };
};
