import { useState } from "react";
import { Button, View, Text, Image, StyleSheet, Dimensions, ImageBackground } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function MyPage(props) {
  const [userinfo, setUserinfo] = useState(null);

  function getStorage(){
    AsyncStorage.getItem('session', (err, result) => {
      setUserinfo(JSON.parse(result));
      console.log(userinfo);
    });
    return userinfo.email;
  }
  

  return (
    <View style={styles.container}>
      <ImageBackground
      source={require('../../assets/mypageBack.png')} resizeMode="cover" style={styles.bgImage}>
      <Ionicons style={styles.settings} name="settings-outline" size={24} color="white" />
        <View style={styles.contents}>
          <Image 
            src={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
            style={styles.profile}/>
          <Text style={styles.username} onPress={getStorage}>친구1</Text>
          <Text style={styles.email}></Text>
          {/* <Text style={styles.stateMess}>마이페이지 입니다~~~</Text> */}
        </View>
      </ImageBackground> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  bgImage: {
    flex: 1,
    width: windowWidth,
    height: windowHeight-380,
    alignItems: "center",
    justifyContent: "center",
  },
  settings: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginTop: 15,
    marginRight: 15,
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  contents: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    color: '#4f4f4f',
    fontSize: 10,
  },
  stateMess: {
    marginTop: 15,
    fontSize: 15,
  }
})

export default MyPage;
