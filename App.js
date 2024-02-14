import { View, Text, Button } from 'react-native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import NotificationController from './NotificationController.android';

const App = () => {
  useEffect(() => {
    getFCMToken();
    //Android Foreground Message handler
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // PushNotification.localNotification({
      //   message: remoteMessage.notification.body,
      //   title: remoteMessage.notification.title,
      //   // bigPictureUrl: remoteMessage.notification.android.imageUrl,
      //   channelId: true,
      //   vibrate: true,
      // });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
      // PushNotification.localNotification({
      //   message: remoteMessage.notification.body,
      //   title: remoteMessage.notification.title,
      //   // bigPictureUrl: remoteMessage.notification.android.imageUrl,
      //   channelId: true,
      //   vibrate: true,
      // });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
    //Android Background Message Handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (e) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <NotificationController /> */}
      <Text>Push Notification with Firebase Demo</Text>
      <Button title="Get FCM Token" onPress={() => getFCMToken()} />
    </View>
  );
};

export default App;
