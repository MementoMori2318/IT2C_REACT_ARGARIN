import * as React from "react";
import { View, Text } from "react-native";
import { ListItem, Icon, Button } from "@rneui/themed";

export default function HomeScreen({ navigation }) {
  const renderListItem = (title, iconName, onPress) => (
    <ListItem
      onPress={onPress}
      containerStyle={{ marginVertical: 16 }}
      bottomDivider
    >
      <Icon name={iconName} />
      <ListItem.Content>
        <ListItem.Title style={{ fontSize: 24 }}>{title}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );

  return (
    <View style={{  justifyContent: "center", padding: 16 }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", marginBottom: 16, alignSelf: "center"}}>
        Record Management System
      </Text>
      {renderListItem("Go to Students", "school", () => {
        navigation.navigate("Student");
      })}
      {renderListItem("Go to Teacher", "book", () => {
        navigation.navigate("Teacher");
      })}
      {renderListItem("Go to Employee", "person", () => {
        navigation.navigate("Employee");
      })}
    </View>
  );
}
