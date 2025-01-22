import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@repo/ui';
import { WebView } from 'react-native-webview';

export default function Native() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView style={styles.container} source={{ uri: 'https://poppy-il8yopml6-poppy-ca4d5978.vercel.app/home' }} />
      {/* <Text>hello world</Text> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 36,
  },
});
