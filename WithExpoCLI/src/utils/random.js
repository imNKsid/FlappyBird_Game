import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const getRandom = (min, max) => {
  const res = Math.floor(Math.random() * (max - min + 1) + min);
  return res;
};

export const getPipeSizePosPair = (addToPosX = 0) => {
  let yPosTop = -getRandom(300, height - 100);

  const pipeTop = {
    pos: { x: width + addToPosX, y: yPosTop },
    size: { height: height * 1.5, width: 75 },
  };
  const pipeBottom = {
    pos: { x: width + addToPosX, y: height * 2 + 200 + yPosTop },
    size: { height: height * 2, width: 75 },
  };

  return { pipeTop, pipeBottom };
};
