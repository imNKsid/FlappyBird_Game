import Matter from "matter-js";

export const Physics = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => t.type === "press")
    .forEach((element) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -8,
      });
    });
  Matter.Engine.update(engine, time.delta);

  return entities;
};
