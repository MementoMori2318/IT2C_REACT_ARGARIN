import {View, FlatList,Text } from "react-native";
import { ListItem, Avatar, Button, Icon } from "@rneui/themed";
import React, {useState, useEffect} from "react";

export default function EmployeeScreen({ navigation }) {
  const ListPressed = (id) => {
    navigation.navigate("Teacher Info", {
      id,
    });
  };

  React.useState(() =>{
    const focused = navigation.addListener("focus", () => {
      getTeacherInfo();
    })
    return focused;
  }, [navigation]);

    const [EmployeeInfo, setEmployeeInfo] = useState([]);
    
    const getEmployeeInfo = async () =>{
      try {
        const response = await fetch('http://172.18.114.201/IT2C_Argarin/Api/employee', {
          method: 'GET',
        });
        const result = await response.json();
        console.log(result.data.teacher_info);
        setEmployeeInfo(result.data.teacher_info);
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