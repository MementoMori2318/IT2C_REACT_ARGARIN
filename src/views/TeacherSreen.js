import {View, FlatList,Text } from "react-native";
import { ListItem, Avatar, Button, Icon } from "@rneui/themed";
import React, {useState, useEffect} from "react";

export default function TeacherScreen({ navigation }) {
  const ListPressed = (id) => {
    navigation.navigate("Student Info", {
      id,
    });
  };

  React.useState(() =>{
    const focused = navigation.addListener("focus", () => {
      getTeacherInfo();
    })
    return focused;
  }, [navigation]);

    const [TeacherInfo, setTeacherInfo] = useState([]);
    
    const getTeacherInfo = async () =>{
      try {
        const response = await fetch('http://192.168.1.3/IT2C_Argarin/Api/teacher', {
          method: 'GET',
        });
        const result = await response.json();
        console.log(result.data.teacher_info);
        setTeacherInfo(result.data.teacher_info);
      } catch (error) {
        console.error(error);
      }
    };
    
    useEffect(() =>{
      getTeacherInfo();
    },[]); 
    
    return (    
    <FlatList
    ListHeaderComponent={
      <>
        <View style={{ paddingVertical: 8 }}>
                  <Button
                    onPress={() => navigation.navigate("Teacher Info")}
                    title="Add Teacher"
                    type="solid"
                    containerStyle={{
                        marginHorizontal: 16,
                        marginVertical: 8,
                        borderRadius: 8,
                    }}
                    icon={<Icon name="plus" type="font-awesome" color="white"/>}
                  />
          {TeacherInfo.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={{
                marginHorizontal: 16,
                marginVertical: 8,
                borderRadius: 8,
              }}
              onPress={() => ListPressed(l.TeacherNo)}
            >
              
              <ListItem.Content>
              <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
                  {l.StudentNo}
                </ListItem.Title>
                <ListItem.Title
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  {l.FirstName + " " + l.MiddleName + " " + l.LastName}
                </ListItem.Title>
                <ListItem.Subtitle style={{ color: "black" }}>
                  {l.Subject}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{ color: "black" }}>
                  {(l.isMale == 1 ? "Male" : "Female")}
                </ListItem.Subtitle>
               
              </ListItem.Content>
              <ListItem.Chevron color="black" />
             
            </ListItem>
          ))}
        </View>
      </>
    }
  />
    );
}