import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@repo/ui';
import WebView from 'react-native-webview';

export default function Native() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: 'http://10.0.2.2:3000/' }} />
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
