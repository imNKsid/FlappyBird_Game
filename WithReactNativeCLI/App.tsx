import {View, StyleSheet} from 'react-native';
import React from 'react';
import Game from './src/components/Game';

const App = () => {
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
