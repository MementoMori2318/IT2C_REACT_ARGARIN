import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { ListItem, Icon, Button } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";

export default function StudentInfoScreen({ navigation }) {
    const route = useRoute();

    if (route.params !== undefined) {
      console.log(route.params.id);
    };

    const [StudentNo, setStudentNo] = React.useState("");
    const [FirstName, setFirstName] = React.useState("");
    const [MiddleName, setMiddleName] = React.useState("");
    const [LastName, setLastName] = React.useState("");
    const [DateOfBirth, setDateOfBirth] = React.useState("");
    const [isMale, setisMale] = React.useState(0);

    const [isDisabledAdd, setDisableAdd] = useState(false);

    const getStudentInfo = (id) => {
      if (id) {
        fetch("http://192.168.1.3/IT2C_Argarin/Api/student/" + id, {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setDisableAdd(true);
    
          if (result.data.student_info !== null) {
            setStudentNo(result.data.student_info.StudentNo);
            setFirstName(result.data.student_info.FirstName);
            setMiddleName(result.data.student_info.MiddleName);
            setLastName(result.data.student_info.LastName);
            setisMale(result.data.student_info.isMale);
            setDateOfBirth(result.data.student_info.DateOfBirth);
          }
        });
      }
    };
    
    useEffect(() => {
      const focused = navigation.addListener("focus", () => {
        getStudentInfo(route.params?.id);
      });
      return () => {
        focused.remove();
      };
    }, [navigation, route.params?.id]);
    
    
    const postStudentInfo = () => {
        console.log("StudentNo = " + StudentNo);
        console.log("FirstName = " + FirstName);
        console.log("MiddleName = " + MiddleName);
        console.log("LastName = " + LastName);
        console.log("DateOfBirth = " + DateOfBirth);
        console.log("isMale = " + isMale);
      
        if (StudentNo && FirstName && MiddleName && LastName && DateOfBirth) {
          setDisableAdd(true);
      
          let formData = new FormData();
            formData.append("SN", StudentNo);
            formData.append("FN", FirstName);
            formData.append("MN", MiddleName);
            formData.append("LN", LastName);
            formData.append("Sex", isMale);
            formData.append("DOB", DateOfBirth);
          fetch("http://192.168.1.3/IT2C_Argarin/Api/student", {
            method: 'POST',
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.meta.code == 200) {
                navigation.navigate("Student");
                setStudentNo("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setisMale(0);
                setDateOfBirth("");
              }
              setDisableAdd(false);
            });
        }
      };
      

    return (
        <>
          <FlatList
            ListHeaderComponent={
              <>
                <View style={{ paddingVertical: 8 }}>
                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>Student No</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Input
                      placeholder="Enter Student No"
                      onChangeText={setStudentNo}
                      value={StudentNo}
                    />
                  </ListItem>

                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>First Name</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Input
                      placeholder="Enter First Name"
                      onChangeText={setFirstName}
                      value={FirstName}
                    />
                  </ListItem>

                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>Middle Name</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Input
                      placeholder="Enter Middle Name"
                      onChangeText={setMiddleName}
                      value={MiddleName}
                    />
                  </ListItem>

                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>Last Name</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Input
                      placeholder="Enter Last Name"
                      onChangeText={setLastName}
                      value={LastName}
                    />
                  </ListItem>

                  <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Gender</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.ButtonGroup
                        buttons={["Female", "Male"]}
                        selectedIndex={isMale}
                        onPress={(index) => setisMale(index)}
                    />
                    </ListItem>

                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>Date of Birth</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Input
                      placeholder="Enter Date of Birth"
                      onChangeText={setDateOfBirth}
                      value={DateOfBirth}
                    />
                  </ListItem>

                  <Button
                    onPress={postStudentInfo}
                    title="Add Student"
                    type="solid"
                    disabled={isDisabledAdd}
                    containerStyle={{
                        marginHorizontal: 16,
                        marginVertical: 8,
                        borderRadius: 8,
                    }}
                    icon={<Icon name="plus" type="font-awesome" color="white"/>}
                  />
                  <Button
                    onPress={() => navigation.navigate("Student")}
                    title="Return"
                    type="solid"
                    containerStyle={{
                        marginHorizontal: 16,
                        marginVertical: 8,
                        borderRadius: 8,
                    }}
                    icon={<Icon name="chevron-left" type="font-awesome" color="white"/>}
                  />
                </View>
              </>
            }
          />
        </>
      );
}      