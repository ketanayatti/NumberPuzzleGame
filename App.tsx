import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Platform, SafeAreaView } from 'react-native';
import { GameContainer } from './src/components';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.gameWrapper}>
        <GameContainer gridRows={4} gridCols={5} />
      </View>
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#e0e5ec' : '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FAFAFA',
    ...(Platform.OS === 'web' ? {
      height: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 5,
    } : {}),
  },
});
