import Matter from "matter-js";
import entities from "../../entities";

export const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;
  Matter.Engine.update(engine, time.delta);

  return entities;
};
