import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import SendBtn from "../../components/Button/SendBtn";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
} from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AskRecord({ navigation }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [text, setText] = useState();

  // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: '알람 요청입니다!',
    body: `${text}`,
    // data: { someData: 'alarm1.mp3' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // 알람을 탭했을 때 
      // console.log(response);
      navigation.navigate("Record")
      // navigation.replace("Record"); // 녹음하는 곳으로 바로 이동
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
});


  return (
    <View style={styles.background}>
        <View style={styles.container}>
            <Image style={styles.profile} />
            <Text style={styles.title}>친구2님에게</Text>
            <TextInput 
              onChangeText={newText => setText(newText)}
              style={styles.content} placeholder="일어나 친구야!! hey dude" maxLength={30}/>
        </View>
        <View style={styles.bottom}>
        <SendBtn onPress={async () => {
          await sendPushNotification('ExponentPushToken[2zU2WrCOFkCvQfxXnSTX9k]');
        }}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    background: {   
        flex: 1,
        backgroundColor: "#fff",
        flexDirection: "column",
    },
    container: {
        flex: 0.9,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 18,
    },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
  },
  content: {
    flex: 0.3,
    fontSize: 15,
  },
  bottom: {
    flex: 0.1,
    alignItems: 'flex-end',
    marginRight: 20,
  }
});
