import { StatusBar } from 'expo-status-bar';
import * as React from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./src/views/HomeScreen";
import StudentScreen from './src/views/StudentScreen';
import StudentInfoScreen from './src/views/StudentInfoScreen';
import TeacherInfoScreen from './src/views/TeacherInfoScreen';
import TeacherScreen from './src/views/TeacherScreen';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Student" component={StudentScreen} />
      <Drawer.Screen name="Teacher" component={TeacherScreen} />
      <Drawer.Screen name="Student Info" component={StudentInfoScreen} options={{ drawerItemStyle:{display:"none"}}}/>
      <Drawer.Screen name="Teacher Info" component={TeacherInfoScreen} options={{ drawerItemStyle:{display:"none"}}}/>
    </Drawer.Navigator>
  </NavigationContainer>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
