import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, ToastAndroid, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import axios from "axios";

export default function Record({navigation}){
  const [recording, setRecording] = useState(null);
  const [sound, setSound] = useState(null);
  const [uri, setUri] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

async function uploadAudio(){
  const formData = new FormData();
  formData.append('file', {
    uri: uri,
    type: 'audio/x-m4a', // m4a 오디오 파일의 MIME 타입
    // type: mime.getType(uri),
    name: 'file.m4a',
  });
  
  // JSON 데이터를 FormData에 추가
  // formData.append("userID", "sunjo");
  const userID = 2;
  formData.append("message", "여기 보내마.");

  axios({
    method: "post",
    // url: `http://10.0.2.2:8082/audio/upload/${userID}`,
    // url: `http://127.0.0.1:8082/audio/upload`,
    // url: `http://10.96.123.85:8082/audio/upload/${userID}`,
    // url: `http://localhost:8082/audio/upload/${userID}`,
    url: `http://13.48.25.201:8082/audio/upload?${userID}`,
    mode: "cors",
    headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    },
    data: formData,
  })
  .then(res => {
    ToastAndroid.show("오디오 파일 업로드 성공", ToastAndroid.SHORT)
    console.log("오디오 업로드 성공");
  }).catch(err => {
    ToastAndroid.show("실패하였습니다", ToastAndroid.SHORT)
    console.log(err);
  })
}

async function startRecording() {
  try {
    console.log('Requesting permissions..');
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    console.log('Starting recording..');
    const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
    console.log('Recording started');
  } catch (err) {
    console.error('Failed to start recording', err);
  }
}

async function stopRecording() {
  console.log('Stopping recording..');
  setRecording(undefined);
  await recording.stopAndUnloadAsync();
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
  });
  setUri(recording.getURI());
  console.log(uri)
  const { sound, status } = await recording.createNewLoadedSoundAsync();
  setDuration(getDurationFormatted(status.durationMillis));
}

  const playRecording = async () => {
    try {
      console.log("starting audio...");
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: true }
      ); // 음성 재생할 수 있는 객체 생성
      await setSoundObj(sound);
      // console.log('Playing Sound', soundObj);
      await sound.playAsync();
    } catch (error) {
      console.error('음성 재생 실패:', error);
    }
  };


  async function downloadAudio(){
    const filename='audio_4'
    axios({
      method: "post",
      // url: `http://localhost:8082/audio/download?filename=${filename}`,
      url: `http://13.48.25.201:8082/audio/download?filename=audio_4`,
      mode: "cors",
      headers: {
        'Content-Type': 'audio/mp3',
        // 'Accept': 'application/json'
      },
    })
    .then(res => {
      ToastAndroid.show("오디오 파일 다운로드 ㄱ", ToastAndroid.SHORT)
      console.log(res);
    }).catch(err => {
      ToastAndroid.show("실패하였습니다", ToastAndroid.SHORT)
      console.log(err);
    })
  }

  function getDurationFormatted(millis) { //녹음시간 구하기
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  return (
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection:'row', alignItems: 'center', gap: 50}}>
        {recording ? (
          <TouchableOpacity
          onPress={stopRecording}>
          <Image
            style={{
              width: 100,
              height: 100,
              overflow: 'hidden',
            }}
            source={require('../../assets/startRecordBtn.png')}
          />
        </TouchableOpacity>
        ) : (
          <TouchableOpacity
          onPress={startRecording}>
          <Image
            style={{
              width: 100,
              height: 100,
              overflow: 'hidden',
            }}
            source={require('../../assets/recordBtn.png')}
          />
        </TouchableOpacity>
        )}
        {uri && <TouchableOpacity
          onPress={playRecording}>
          <Image
            style={{
              width: 50,
              height: 50,
              overflow: 'hidden',
            }}
            source={require('../../assets/playBtn.png')}
          />
        </TouchableOpacity>}
      </View>
      {uri && <Text style={{fontSize: 30}}>녹음시간: {duration}</Text>}
      <Button title="오디오 upload" onPress={uploadAudio} />
      <Button title="오디오 download" onPress={downloadAudio} />
      <Text style={{color: 'red'}}>오디오 업로드, 다운로드 부분에서 오류가 있습니다! 양해부탁드립니다</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 40,
  },
})
