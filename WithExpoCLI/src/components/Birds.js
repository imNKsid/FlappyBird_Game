import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Matter from "matter-js";

const Birds = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  //   const color = props.color;
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
            borderRadius: widthBody / 2,
            borderWidth: 1,
            borderStyle: "solid",
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
            width: widthBody,
            height: heightBody,
          },
        ]}
      />
    </>
  );
};

export default (world, color, pos, size) => {
  //Exporting a factory function, with 4 arguments, that creates the bird's physics body using Matter.js.

  //Creating a rectangular object "initialBird".
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Bird" }
  );
  Matter.World.add(world, initialBird); //Adding the initialBird to the Game's physics world.
  return {
    body: initialBird,
    color,
    pos,
    renderer: <Birds />,
  };
  //Finally, returning an object containing the bird's body (body), its color (color),
  //its position (pos), and a reference to the Birds component.
};

const styles = StyleSheet.create({
  abc: {
    position: "absolute",
  },
});
