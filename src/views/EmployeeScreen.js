import {View, FlatList,Text } from "react-native";
import { ListItem, Avatar, Button, Icon } from "@rneui/themed";
import React, {useState, useEffect} from "react";

export default function EmployeeScreen({ navigation }) {
  const ListPressed = (id) => {
    navigation.navigate("Employee Info", {
      id,
    });
  };

  React.useState(() =>{
    const focused = navigation.addListener("focus", () => {
      getEmployeeInfo();
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
        console.log(result.data.employee_info);
        setEmployeeInfo(result.data.employee_info);
      } catch (error) {
        console.error(error);
      }
    };
    
    useEffect(() =>{
      getEmployeeInfo();
    },[]); 
    
    return (    
    <FlatList
    ListHeaderComponent={
      <>
        <View style={{ paddingVertical: 8 }}>
                  <Button
                    onPress={() => navigation.navigate("Employee Info")}
                    title="Add Employee"
                    type="solid"
                    containerStyle={{
                        marginHorizontal: 16,
                        marginVertical: 8,
                        borderRadius: 8,
                    }}
                    icon={<Icon name="plus" type="font-awesome" color="white"/>}
                  />
          {EmployeeInfo.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={{
                marginHorizontal: 16,
                marginVertical: 8,
                borderRadius: 8,
              }}
               onPress={() => ListPressed(l.EmployeeNo)}
            >
              
              <ListItem.Content>
              <ListItem.Title style={{ color: "black", fontWeight: "bold" }}>
                  {"EmployeeNo: " + l.EmployeeNo}
                </ListItem.Title>
                <ListItem.Title
                  style={{ color: "black", fontWeight: "bold" }}
                >
                 {"Name: "+ l.FirstName + " " + l.MiddleName + " " + l.LastName}
                </ListItem.Title>
                <ListItem.Subtitle style={{ color: "black" }}>
                   {"Job: "+l.Job}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{ color: "black" }}>
                 {"Gender: " + (l.isMale == 1 ? "Male" : "Female")}
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