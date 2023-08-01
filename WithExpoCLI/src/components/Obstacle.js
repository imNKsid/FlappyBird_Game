import { StyleSheet, Image, View } from "react-native";
import React from "react";
import Matter from "matter-js";

const Obstacle = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <>
      <View
        style={[
          styles.abc,
          {
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
            borderColor: "green",
            backgroundColor: "green",
          },
        ]}
      />
      {/* <Image
        source={require("../../assets/images/pipe.png")}
        style={[
          //   styles.abc,
          {
            left: xBody,
            top: yBody,
            width: widthBody,
            height: heightBody,
            // borderColor: color,
          },
        ]}
      /> */}
    </>
  );
};

export default (world, label, color, pos, size) => {
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: label, isStatic: true }
  );
  Matter.World.add(world, initialObstacle);
  return {
    body: initialObstacle,
    color,
    pos,
    renderer: <Obstacle />,
  };
};

const styles = StyleSheet.create({
  abc: {
    borderWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
});
