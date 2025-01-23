import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@repo/ui';
import { WebView } from 'react-native-webview';
import { usePushNoticiations } from './usePushNotifications';

export default function Native() {
  const { expoPushToken, notification } = usePushNoticiations();

  const data = JSON.stringify(notification, undefined, 2);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <WebView style={styles.container} source={{ uri: 'https://poppy-b1v4jfcia-poppy-ca4d5978.vercel.app/home' }} /> */}
      <Text>Token: {expoPushToken?.data}</Text>
      <Text>{data}</Text>
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
