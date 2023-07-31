import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { GameEngine } from "react-native-game-engine";
import { Physics } from "../utils/physics";
import entities from "../../entities";

const Game = () => {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setRunning(true);
  }, []);

  return (
    <SafeAreaView>
      <GameEngine
        systems={[Physics]}
        entities={entities()}
        running={running}
        style={styles.gameEngine}
      />
    </SafeAreaView>
  );
};

export default Game;

const styles = StyleSheet.create({
  gameEngine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
