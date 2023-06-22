import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ToastAndroid,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import GradientButton from "../../components/Button/GradientButton";
import GradientBorderButton from "../../components/Button/GradientBorderButton";
import * as Notifications from 'expo-notifications';

export default function Login({ navigation }) {
  // node data가져오기
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  async function registerForPushNotificationsAsync() {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

const LoginEvent = () => {
    const token = registerForPushNotificationsAsync();
    const formdata = {
      email : email.trim(),
      password : password,
    }
    if(!email || !password){
      ToastAndroid.show("데이터를 입력하세요", ToastAndroid.SHORT)
    }else{
      axios
      .post(`http://13.48.25.201:8082/auth/login`, JSON.stringify(formdata), {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      .then((res) => {
        // console.log(res);
        if(res.data["fail"]){ //로그인 실패
          ToastAndroid.show("로그인에 실패하였습니다.", ToastAndroid.SHORT)
        }else{ //로그인 성공
          console.log(token);
          ToastAndroid.show("로그인 성공!", ToastAndroid.SHORT)
          AsyncStorage.setItem('session', JSON.stringify({
            email : res.data.email,
            nickname : res.data.nickname,
          })); // session에 저장
          navigation.replace("TabNavigation", {"userdata" : res["data"]}); //tabnavigation으로 이동
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text
          style={{
            color: "#8C92FF",
            fontSize: 40,
            fontWeight: "bold",
          }}
        >
          Hey Dude!
        </Text>
        {/* 데이터 가져오기 */}
        {/* <Text>{JSON.stringify(data)}</Text> */}
      </View>
      <View style={styles.inputs}>
        {/* <form method="POST"> */}
        <TextInput
          style={styles.InputStyle}
          placeholder="email"
          onChangeText={(text)=> setEmail(text)}
          keyboardType="email-address"
          />
        <TextInput
          style={styles.InputStyle}
          placeholder="password"
          onChangeText={(text)=> setPassword(text)}
          secureTextEntry
        />
        {/* </form> */}
      </View>
      <View style={styles.buttons}>
        <GradientButton
          onPress={LoginEvent} 
          colors={["#8C92FF", "#92FBE7"]}
          text="Login"
        />
        <GradientBorderButton
          onPress={() => navigation.navigate("Signup")}
          style={styles.visit}
          style2={styles.circleGradient}
          colors={["#8C92FF", "#92FBE7"]}
          text="Sign Up"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 40,
  },
  title: {
    flex: 0.13,
    color: "pink",
    fontSize: 40,
  },
  inputs: {
    flex: 0.25,
  },
  buttons: {
    flex: 0.2,
  },
  InputStyle: {
    backgroundColor: "#EDEFF2",
    borderRadius: 10,
    width: 300,
    height: 58,
    padding: 15,
    margin: 10,
  },
});
