import * as React from "react";
import { View } from "react-native";
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
    <View style={{ flex: 1, justifyContent: "center" }}>
      {renderListItem("Go to Students", "school", () => {
        navigation.navigate("Student");
      })}
      {renderListItem("Go to Teacher", "book", () => {
        navigation.navigate("Teacher");
      })}
      {renderListItem("Go to Employee", "archive", () => {
        navigation.navigate("Employee");
      })}
    </View>
  );
}
