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
            borderColor: color,
            backgroundColor: color,
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
  //Exporting a factory function, with 5 arguments, that creates the obstacle's physics body using Matter.js.

  //Creating a rectangular object "initialObstacle".
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: label, isStatic: true } //Here, label is the name of the Obstacle (either top or bottom).
  );
  Matter.World.add(world, initialObstacle);
  return {
    body: initialObstacle,
    color,
    pos,
    renderer: <Obstacle />,
  };
  //Finally, returning an object containing the Obstacle's body (body), its color (color),
  //its position (pos), and a reference to the Obstacle component.
};

const styles = StyleSheet.create({
  abc: {
    borderWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
});
