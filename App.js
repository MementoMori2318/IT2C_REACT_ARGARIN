import { StatusBar } from 'expo-status-bar';
import * as React from "react";
import { StyleSheet, Text, Button, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./src/views/HomeScreen";
import StudentScreen from './src/views/StudentScreen';
const Drawer = createDrawerNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Student" component={StudentScreen} />
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
