import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Matter from "matter-js";

const Birds = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;
  //   console.log("xBody =>", xBody, yBody, widthBody, heightBody);
  return (
    <>
      {/* <View
      style={[
        styles.abc,
        {
          left: xBody,
          top: yBody,
          width: widthBody,
          height: heightBody,
          borderColor: color,
        },
      ]}
    /> */}
      <Image
        source={require("../../assets/images/bird.png")}
        style={[
          styles.abc,
          {
            left: xBody,
            top: yBody,
            width: 38,
            height: 27,
            // borderColor: color,
          },
        ]}
      />
    </>
  );
};

export default (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Bird" }
  );
  Matter.World.add(world, initialBird);
  return {
    body: initialBird,
    color,
    pos,
    renderer: <Birds />,
  };
};

const styles = StyleSheet.create({
  abc: {
    borderWidth: 1,
    // borderStyle: "solid",
    position: "absolute",
  },
});
