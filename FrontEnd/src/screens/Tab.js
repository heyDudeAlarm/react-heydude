import React from "react";
import { Image, View, TouchableOpacity, ToastAndroid } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import {
  NavigationContainer,
  createNavigationContainerRef,
} from "@react-navigation/native";
import Alarm from "../screens/Alarm";
import RecordListScreen from "./Record/RecordListScreen";
import Profile from "../screens/Profile";
import Friends from "./Friends/Friends";
import AddAlarm from "./AddAlarm";
import MorningCall from "../screens/MorningCall";
// import * as Notifications from 'expo-notifications';
// const token = (await Notifications.getDevicePushTokenAsync()).data;

const Tab = createBottomTabNavigator();
const Stack = createNavigationContainerRef();

const TabIcon = ({ name, size, color }) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const IconOcations = ({ name, size, color }) => {
  return <Octicons name={name} size={size} color={color} />;
};

const TabNavigation = ({ navigation, route }) => {
  // const userdata = route.params.userdata;
  // console.log(token);
  return (
    <Tab.Navigator
      initialRouteName="Alarm"
      tabBarOptions={{ showLabel: false, activeTintColor: "#000" }}
    >
      <Tab.Screen
        name="Alarm"
        component={Alarm}
        options={{
          tabBarIcon: (props) => TabIcon({ ...props, name: "alarm" }),
          headerShown: false, //header숨기기
        }}
      />
      <Tab.Screen
        name="MorningCall"
        // component={RecordListScreen}
        children={()=><MorningCall toRecord={()=>{navigation.navigate("Record")}} toAskrecord={()=>{navigation.navigate("AskRecord")}}/>}
        // component={MorningCall}
        options={{
          tabBarIcon: (props) =>
            TabIcon({ ...props, name: "microphone-outline" }),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddAlarm"
        component={AddAlarm}
        options={{
          tabBarIcon: () => {
            return (
              // navigator로 이동
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("AddAlarm");
                }}
              >
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../../assets/icons/add-alarm.png")}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Tab.Screen
        name="Friends"
        children={()=><Friends toAskrecord={()=>{navigation.navigate("AskRecord")}}/>}
        options={{
          tabBarIcon: (props) => IconOcations({ ...props, name: "person-add" }),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        // component={Profile}
        // children={()=><Profile userdata={userdata || "go"}/>}
        children={()=><Profile />}
        options={{
          tabBarIcon: (props) => IconOcations({ ...props, name: "home" }),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
