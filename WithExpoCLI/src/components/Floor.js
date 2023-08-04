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
        styles.floor,
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
  //Exporting a factory function that creates the floor's physics body using Matter.js.
  //'Exporting a factory function' means making a function available to other parts of the code (other files) by exporting it
  //from its current file so that it can be used to create and return objects with a specific structure or behavior.
  //In JavaScript, a factory function is a function that produces and returns objects based on the provided parameters.
  //It acts as a blueprint to create instances of objects with similar characteristics.

  //Here, in the above code, we're exporting a factory function with 4 arguments: world, color, pos(position) & size(height & width).

  //Down below, we're creating an 'initialFloor' object using "Matter.Bodies.rectangle()".
  //"Matter.Bodies.rectangle()" is a method provided by the Matter.js, which is used to create a rectangular shape.
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Floor", isStatic: true }
  );
  Matter.World.add(world, initialFloor); //Here, we're adding the newly created rectangle(initialFloor) to our world.
  return {
    body: initialFloor,
    color,
    pos,
    renderer: <Floor />,
  };
  //Finally, we're returning an object containing the floor's body (body), its color (color),
  //its position (pos), and a reference to the Floor component.
};

const styles = StyleSheet.create({
  floor: {
    position: "absolute",
  },
});

//Props has these many things -
// {
//     "body": {
//       "_original": {
//         "density": 0.001,
//         "friction": 0.1,
//         "inertia": 799240,
//         "inverseInertia": 0.0000012511886291977379,
//         "inverseMass": 0.06410256410256411,
//         "mass": 15.6,
//         "restitution": 0

//       },
//       "angle": 0,
//       "anglePrev": 0,
//       "angularSpeed": 0,
//       "angularVelocity": 0,
//       "area": 15600,
//       "axes": [[Object], [Object]],
//       "bounds": {
//         "max": [Object],
//         "min": [Object]},
//         "chamfer": null,
//         "circleRadius": 0,
//         "collisionFilter": {
//           "category": 1,
//           "group": 0,
//           "mask": 4294967295

//         },
//         "constraintImpulse": {
//           "angle": 0,
//           "x": 0,
//           "y": 0

//         },
//         "deltaTime": 16.666666666666668,
//         "density": Infinity,
//         "events": null,
//         "force": {
//           "x": 0,
//           "y": 0

//         },
//         "friction": 1,
//         "frictionAir": 0.01,
//         "frictionStatic": 0.5,
//         "id": 31,
//         "inertia": Infinity,
//         "inverseInertia": 0,
//         "inverseMass": 0,
//         "isSensor": false,
//         "isSleeping": false,
//         "isStatic": true,
//         "label": "Floor",
//         "mass": Infinity,
//         "motion": 0,
//         "parent": [Circular],
//         "parts": [[Circular]],
//         "plugin": {},
//         "position": {
//           "x": 195,
//           "y": -60

//         },
//         "positionImpulse": {
//           "x": 0,
//           "y": 0

//         },
//         "positionPrev": {
//           "x": 195,
//           "y": -60

//         }, "render": {
//           "fillStyle": "#14151f",
//           "lineWidth": 1,
//           "opacity": 1,
//           "sprite": [Object],
//           "strokeStyle": "#555",
//           "visible": true
//         },
//         "restitution": 0,
//         "sleepCounter": 0,
//         "sleepThreshold": 60,
//         "slop": 0.05,
//         "speed": 0,
//         "timeScale": 1,
//         "torque": 0,
//         "totalContacts": 0,
//         "type": "body",
//         "velocity": {
//           "x": 0,
//           "y": 0
//         },
//         "vertices": [[Object], [Object], [Object], [Object]]
//     },
//     "color": "green",
//     "layout": {
//       "height": 844,
//       "width": 390,
//       "x": 0,
//       "y": 0

//     },
//     "pos": {
//       "x": 195,
//       "y": -60

//     },
//     "renderer": <Floor />,
//     "screen": {
//       "fontScale": 1,
//       "height": 844,
//       "scale": 3,
//       "width": 390
//     }

//   }
