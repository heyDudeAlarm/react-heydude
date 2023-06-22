import * as React from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useWindowDimensions
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import RecordListScreen from './Record/RecordListScreen'
import Friends from './Friends/Friends'


export default function TabViewExample(props) {
  
  const FirstRoute = () => (
    <RecordListScreen toRecord={props.toRecord}/>
  );

  const SecondRoute = () => (
    <Friends toAskrecord={props.toAskrecord}/>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: '모닝콜 보내기' },
    { key: 'second', title: '모닝콜 요청하기' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: StatusBar.currentHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
});
