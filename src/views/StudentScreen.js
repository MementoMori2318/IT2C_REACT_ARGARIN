import {View, FlatList,Text } from "react-native";
import { ListItem, Avatar, Button, Icon } from "@rneui/themed";
import React, {useState, useEffect} from "react";

export default function StudentScreen({ navigation }) {
  React.useState(() =>{
    const focused = navigation.addListener("focus", () => {
      getStudentInfo();
    })
    return focused;
  }, [navigation]);
       const [StudentInfo, setStudentInfo] = useState([]);
    //  const StudentInfo = [
    //     {
    //         StudentNo: "1234",
    //         FirstName: "AA",
    //         MiddleName: "BB",
    //         LastName: "CC",
    //         isMale: 1,
    //         DateOfBirth: "1990-10-11",
    //     },
    //     {
    //         StudentNo: "12345",
    //         FirstName: "DD",
    //         MiddleName: "EE",
    //         LastName: "FF",
    //         isMale: 0,
    //         DateOfBirth: "1991-11-11",
    //     },
    // ];
      const getStudentInfo = () =>{
        fetch('http://localhost/IT2C_Argarin/Api/student',{
          method: 'GET',
        })
        .then((res) => res.json())
        .then((result) => {
          console.log(result.data.student_info);
          setStudentInfo(result.data.student_info);
        });
      };

      useEffect(() =>{
        (async ()=>{
          getStudentInfo();
        })();
      },[]);
    return (    
    <FlatList
    ListHeaderComponent={
      <>
        <View style={{ paddingVertical: 8 }}>
                  <Button
                    onPress={() => navigation.navigate("Student Info")}
                    title="Add Student"
                    type="solid"
                    containerStyle={{
                        marginHorizontal: 16,
                        marginVertical: 8,
                        borderRadius: 8,
                    }}
                    icon={<Icon name="plus" type="font-awesome" color="white"/>}
                  />
          {StudentInfo.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={{
                marginHorizontal: 16,
                marginVertical: 8,
                borderRadius: 8,
              }}
            >
              <Avatar
                rounded
                source={{ uri: "https://i.pravatar.cc/300" }}
              />
              <ListItem.Content>
                <ListItem.Title
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  {l.FirstName + " " + l.MiddleName + " " + l.LastName}
                </ListItem.Title>
                <ListItem.Subtitle style={{ color: "black" }}>
                  {l.StudentNo +
                    " | " +
                    (l.isMale == 1 ? "Male" : "Female")}
                </ListItem.Subtitle>
                <ListItem.Subtitle style={{ color: "black" }}>
                  {l.DateOfBirth}
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