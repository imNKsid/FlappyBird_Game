import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GameEngine } from "react-native-game-engine";
import { StatusBar } from "expo-status-bar";

import { Physics } from "../utils/physics";
import entities from "../../entities";

const Game = () => {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setRunning(false);
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/bg.png")}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.pointStyle}>{points}</Text>
        {/* GameEngine is responsible for updating and rendering the game entities. Here, the game entities are (Bird, Obstacles, Floor). */}
        <GameEngine
          ref={(ref) => setGameEngine(ref)} //taking the reference of the "GameEngine" and storing that in "gameEngine" state variable.
          systems={[Physics]} //using the Physics function as a system to handle game physics and updates the game entities based on user interactions and game logic.
          entities={entities()} //using the function returned from entities(), representing the game elements (Bird, Obstacles, Floor).
          running={running} //depicts if the game engine should run or not, based on True/False value
          onEvent={(e) => {
            switch (e.type) {
              case "game_over":
                setRunning(false);
                gameEngine.stop();
                break;

              case "new_point":
                setPoints(points + 1);
                break;
            }
          }}
          style={styles.gameEngine}
        >
          <StatusBar style="auto" hidden={true} />
        </GameEngine>
        {!running ? (
          <View style={styles.startGameContainer}>
            <TouchableOpacity
              style={styles.startGameArea}
              onPress={() => {
                setPoints(0);
                setRunning(true);
                gameEngine.swap(entities()); //Here, we're updating the game engine's entities with new configurations.
                //The "swap" method replaces the current set of entities in the game engine with the new ones.
              }}
            >
              <Text style={styles.startGame}>START GAME</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  gameEngine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pointStyle: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  startGameContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startGameArea: {
    backgroundColor: "#000",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  startGame: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 30,
  },
});
