import { StyleSheet, View } from "react-native";
import Game from "./src/components/Game";

export default function App() {
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
