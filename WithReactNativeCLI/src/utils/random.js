import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
export const getRandom = (min, max) => {
  //The "getRandom()" is used to generate a random whole number between min and max.

  //How? -> Down below is the explanation.
  //"Math.random()" will always generate a random value from 0.0 to 1.0(exclusive).
  //By multiplying "Math.random()" with "(max - min + 1)" and adding "min", we get a random floating-point number
  //within the range of [min, max].

  //Let's say the min=10, max=20 & "Math.random()" gives 0.2, then "Math.random() * (max - min + 1) + min"
  //will become "(0.2 * (20-10+1) + 10) = (0.2 * 11 + 10) = (2.2 + 10) = 12.2".
  //The "Math.floor()" rounds a number DOWN to the nearest integer, which means 12.2 will become 12.
  //Thus, 12 is between 10 and 20.

  const res = Math.floor(Math.random() * (max - min + 1) + min);
  return res; //returning a a random whole number between min and max.
};

export const getPipeSizePosPair = (addToPosX = 0) => {
  //Here, a parameter "addToPosX" is passed. The default value is 0.

  let yPosTop = -getRandom(300, height - 100); //Fetching a random value between 300 and "height".
  //After fetching a random value, making that number as negative to show the top position in Y-axis.
  //Note that, in iPhone14 the "height" value is 844. So, the "yPosTop" value will be between 300 & 844.

  //Creating 2 pipes(top & bottom) with the different positions and sizes.
  //The "x: width + addToPosX" denotes the pipes will appear at a distance of addToPosX from the right edge of the screen.
  const pipeTop = {
    pos: { x: width + addToPosX, y: yPosTop },
    size: { height: height * 1.5, width: 75 },
  };
  //We're setting the "height" to "height * 1.5", meaning the pipe will be 1.5 times longer
  //because the Y-position (yPosTop) will also be a bit higher.

  const pipeBottom = {
    pos: { x: width + addToPosX, y: height * 2 + 200 + yPosTop },
    size: { height: height * 2, width: 75 },
  };
  //The Y-position is set to "height * 2 + 200 + yPosTop", meaning if the 2 pipes(top & bottom)
  //appear together it should leave a gap of 200.

  //We're setting the "height" to "height * 2", meaning the pipe will be 2 times longer
  //because the Y-position (height * 2 + 200 + yPosTop) will also be a bit higher.

  return { pipeTop, pipeBottom }; //Finally, returning the 2 pipes.
};
