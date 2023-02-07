import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import React, {useEffect} from 'react';

PushNotification.createChannel(
  {
    channelId: 'channel-id',
    channelName: 'My Channel',
  },
  created => console.log(`Create Channel Returned ${created}`),
); // callback returns whether the channel was created,false means already exist.

const NotificationController = props => {
  useEffect(() => {
    // PushNotification.getChannels(function (channel_ids){
    //     console.log(channel_ids);
    // })
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        bigPictureUrl: remoteMessage.notification.android.imageUrl,
        channelId: true,
        vibrate: true,
      });
    });
    return unsubscribe;
  }, []);
  return null;
};

export default NotificationController;
