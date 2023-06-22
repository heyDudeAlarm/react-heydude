import React from "react";
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import Toast from 'react-native-toast-message';
import Login from "./src/screens/Login/Login";
import Signup from "./src/screens/Login/Signup";
import TabNavigation from "./src/screens/Tab";
import HomeScreen from "./src/screens/ex/HomeScreen";
import RecordListScreen from "./src/screens/Record/RecordListScreen";
import Record from "./src/screens/Record/Record";
import RecordList from "./src/components/RecordList";
import AddAlarm from "./src/screens/AddAlarm";
import Profile from "./src/screens/Profile";
import AskRecord from "./src/screens/Friends/AskRecord";
import SendBtn from "./src/components/Button/SendBtn";
import NotificationScreen from "./src/screens/Notification";
import ExpoNotiFCM from "./src/screens/ExpoNotiFCM"
import FirebaseNoti from "./src/screens/FirebaseNoti";
import MorningCall from "./src/screens/Alarm";

// send token to your server
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const SCREEN_WIDTH = Dimensions.get("window").width; // 스크린가로사이즈를 가져옴
const Stack = createStackNavigator();

function WholeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      options={{ headerShown: false }}
      screenOptions={{
        headerTitleAlign: "center",
        gestureEnabled: true, // 제스처 기능 활성화
        gestureDirection: 'vertical', // 수직 방향 스와이프만 허용
      }}
    >
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{ 
          headerShown: false,
          }}
      />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/> 
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Record" options={{title: '모닝콜 녹음'}} component={Record}/>
      <Stack.Screen name="RecordListScreen" component={RecordListScreen} />
      <Stack.Screen name="AddAlarm" component={AddAlarm} />
      <Stack.Screen name="Profile" component={Profile} /> 
      <Stack.Screen name="AskRecord" options={{title: '모닝콜 요청'}} component={AskRecord} /> 
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} /> 
      <Stack.Screen name="ExpoNotiFCM" component={ExpoNotiFCM} /> 
      <Stack.Screen name="FirebaseNoti" component={FirebaseNoti} />
      <Stack.Screen name="MorningCall" component={MorningCall} />
    </Stack.Navigator>
  );
}

export default function App(){
  return(
    <NavigationContainer>
      <Toast 
        position='bottom'
        bottomOffset={20}/>
      <WholeStack />
    </NavigationContainer>
  );
}
