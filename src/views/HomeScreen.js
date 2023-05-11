import * as React from "react";
import { Button, View } from "react-native";

export default function HomeScreen({ navigation }) {
return (
    <View style={{ flex: 1, justifyContent: "center"}}>
    <View style={{ marginVertical: 16 }}>
      <Button 
        onPress={() => navigation.navigate("Student")} 
        title="Go to Students"
        containerStyle={{ marginVertical: 8, marginHorizontal: 16, }}
      />
    </View>
    <View style={{ marginVertical: 16 ,}}>
      <Button 
        onPress={() => navigation.navigate("Teacher")} 
        title="Go to Teacher"
        containerStyle={{ marginVertical: 8, marginHorizontal: 16, }}
      />
    </View>
    <View style={{ marginVertical: 16 ,}}>
      <Button 
        onPress={() => navigation.navigate("Employee")} 
        title="Go to Employee"
        containerStyle={{ marginVertical: 8, marginHorizontal: 16, }}
      />
    </View>
  </View>
    
    );
}