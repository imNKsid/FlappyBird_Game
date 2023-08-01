import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Matter from "matter-js";

const Floor = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;
  //   console.log("Floor =>", xBody, yBody, widthBody, heightBody);

  return (
    <View
      style={[
        styles.abc,
        {
          left: xBody,
          top: yBody,
          width: widthBody,
          height: heightBody,
          backgroundColor: color,
        },
      ]}
    />
  );
};

export default (world, color, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Floor", isStatic: true }
  );
  Matter.World.add(world, initialFloor);
  return {
    body: initialFloor,
    color,
    pos,
    renderer: <Floor />,
  };
};

const styles = StyleSheet.create({
  abc: {
    borderWidth: 1,
    borderStyle: "solid",
    position: "absolute",
  },
});
