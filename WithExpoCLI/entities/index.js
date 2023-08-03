import Matter from "matter-js"; //Matter is a physics engine used to handle physics simulations in the game.
import Birds from "../src/components/Birds";
import Floor from "../src/components/Floor";

import { Dimensions } from "react-native";
import Obstacle from "../src/components/Obstacle";
import { getPipeSizePosPair } from "../src/utils/random";

const { height, width } = Dimensions.get("window");

export default (restart) => {
  //The "Matter.Engine.create()" method creates a physics engine which will be used to handle physics simulations in the game.
  let engine = Matter.Engine.create({ enableSleeping: false });
  //The "{ enableSleeping: false }" configuration option is used to disable sleeping of bodies in the physics simulation,
  //ensuring that bodies are continuously updated even if they are not moving.

  let world = engine.world; //Accessing the "world" property of the Matter.js physics engine.
  //The "world" represents the physics world where bodies (entities) and physics interactions take place.

  engine.gravity.y = 0.4; //Setting the gravity in the y-direction for the physics engine.
  //A positive value of 0.4 means that gravity will pull bodies downwards, simulating the effect of gravity on the game elements.

  const pipeSizePosA = getPipeSizePosPair(); //Creating the upper pipe having size and position.
  const pipeSizePosB = getPipeSizePosPair(width * 0.9); //Creating the lower pipe having size and position. Giving position based on 90% of the screen width (width * 0.9).
  //Why 90%? -> Because it creates variation in the placement of obstacles(top & bottom),  making the game more interesting and challenging for players.
  //Otherwise, both the pipes will always appear at the same time.

  return {
    //Returning, or better to say rendering, every game entities.
    physics: { engine, world }, //Returning the "physics" property, which contains the physics engine (engine) and the physics world (world).
    Bird: Birds(world, "green", { x: 50, y: 300 }, { height: 27, width: 38 }),
    //Returning "Birds" component, and passing the physics world, the color "green",
    // the initial position { x: 50, y: 300 }, and the size { height: 27, width: 38 } as props.
    //Here, { height: 27, width: 38 } is calculated experimentally as per the height of the bird's image.

    //Down below, returning the "Obstacle" component, and passing the physics world, the color "green", with different positions and size.
    ObstacleTop1: Obstacle(
      world,
      "ObstacleTop1",
      "green",
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size
    ),
    ObstacleBottom1: Obstacle(
      world,
      "ObstacleBottom1",
      "green",
      pipeSizePosA.pipeBottom.pos,
      pipeSizePosA.pipeBottom.size
    ),

    ObstacleTop2: Obstacle(
      world,
      "ObstacleTop2",
      "green",
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size
    ),
    ObstacleBottom2: Obstacle(
      world,
      "ObstacleBottom2",
      "green",
      pipeSizePosB.pipeBottom.pos,
      pipeSizePosB.pipeBottom.size
    ),

    //Returning "Floor" component, and passing the physics world, the color "green", positioning
    //at the bottom of the screen (vertically), and the size { height: 40, width: width } as props.
    Floor: Floor(
      world,
      "green",
      { x: width / 2, y: height },
      { height: 40, width: width }
    ),

    //Returning "Floor" component, and passing the physics world, the color "green", positioning
    //at the top of the screen (vertically), and the size { height: 40, width: width } as props.
    FloorTop: Floor(
      world,
      "green",
      { x: width / 2, y: -60 },
      { height: 40, width: width }
    ),
  };
};
