import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { GameContainer } from './src/components';

export default function App() {
  return (
    <>
      <GameContainer gridRows={4} gridCols={5} />
      <StatusBar style="dark" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
