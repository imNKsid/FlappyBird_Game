import Matter from "matter-js";
import { getPipeSizePosPair } from "./random";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Physics = (entities, { touches, time, dispatch }) => {
  //Here, "entities" is an object representing the current state of the game entities, including the bird and obstacles.
  //It is used to update the entities' positions and other properties during the game loop.

  //"touches" is an array of touch events, containing information about user interactions on the screen.

  //"time" is an object containing information about the time elapsed since the last frame of the game loop.

  //"dispatch" is a function used to dispatch events to modify the game state, such as updating the points or ending the game.

  let engine = entities.physics.engine; //It extracts the "engine" property from the entities.physics object, which is the physics engine created using Matter.js.
  //Matter.js is a 2D physics engine that handles the physics calculations for the game entities.

  touches
    .filter((t) => t.type === "press")
    .forEach((element) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -8, //Here, the "touches" prop is used to detect touch start events. When the player touches the screen, the bird's vertical velocity is set to -8, causing it to jump.
      });
    });

  //The "Matter.Engine.update()" calculates how much time has passed since the last update and then adjusts the positions and properties of the objects accordingly.
  //For example, if the game is running at 60 frames per second (fps), Matter.Engine.update() will be called approximately 60 times per second to update the physics simulation.

  Matter.Engine.update(engine, time.delta); //This line ensures that the physics engine calculations are based on the time elapsed since the last frame, making the game's physics independent of the frame rate.
  //This is crucial for games to ensure that the gameplay remains consistent across different devices with varying frame rates.

  //Here, the "time.delta" property gives the time difference between the current frame and the previous frame.
  //This information is used to control the speed of various game elements and ensure consistent behavior across devices with different frame rates.

  for (let index = 1; index <= 2; index++) {
    if (
      //Here, the 'entities' object contains the game entities, like the bird, floor, and the obstacles.
      //We're accessing just the Obstacle entity.
      entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 && //This checks if the rightmost x-coordinate of the obstacle entity is less than or equal to 50. It means the obstacle is getting close to the bird's position from right to left.
      !entities[`ObstacleTop${index}`].point //This checks the point property of Obstacles. If the obstacle hasn't been scored yet (i.e., the bird has not passed it from right to left), then this condition will be true.
      //Here, 50 is an arbitrary value chosen by experimentation to determine when an obstacle is considered close enough to the bird's position to be scored as the bird passes it.
    ) {
      entities[`ObstacleTop${index}`].point = true; //Making the point property to true which means means that the bird has successfully passed the obstacle, and the obstacle is now scored.
      dispatch({ type: "new_point" }); //dispatching an event of type "new_point". It is used to send events to modify the game state.
    }

    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      //This checks if the rightmost x-coordinate of the obstacle entity is less than or equal to 0. It means the obstacle is passed from right to left and no longer visible.
      const pipeSizePos = getPipeSizePosPair(width * 0.9); //A function to get a new set of random pipe size and position values.
      //It calculates the pipe position at a distance of 90% of the screen width (0.9 times the screen width) from the right edge of the screen.
      //The main purpose is to create a new obstacle towards the right of screen moving towards left, thus creating an endless loop of obstacles.

      Matter.Body.setPosition(
        entities[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.pos
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${index}`].body,
        pipeSizePos.pipeBottom.pos
      );
      //The above 2 lines update the positions of obstacle(top1, top2 & bottom1, bottom2), so that it can start moving into view again from the right.

      entities[`ObstacleTop${index}`].point = false; //Again making the point property to false, as it will be a new obstacle.
    }

    //Here, the "Matter.Body.translate()" method is used to update the positions of the obstacles, moving them horizontally to the left.
    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {
      x: -3,
      y: 0,
    }); //This line moves the "ObstacleTop1" and "ObstacleTop2" entity horizontally to the left by 3 units.
    Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {
      x: -3,
      y: 0,
    }); //This line moves the "ObstacleBottom1" and "ObstacleBottom2" entity horizontally to the left by 3 units.

    //The above 2 lines are used for moving the Obstacles from right to left.
  }

  //Here, we're setting up an event listener using Matter.js.
  //It listens for the "collisionStart" event, which occurs when two bodies collide with each other.
  Matter.Events.on(engine, "collisionStart", (event) => {
    dispatch({ type: "game_over" }); //dispatching an event of type "game_over".
  });
  return entities; //After the for-loop and other code execution, the Physics function returns the updated entities object.
  //The "entities" object contains the modified positions and properties of the game entities (bird, obstacles, floor).
};
