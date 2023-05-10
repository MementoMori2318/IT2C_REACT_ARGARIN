import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
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
    const [isDisabledEdit, setDisableEdit] = useState(false);

    React.useState(() => {
      const clear = navigation.addListener("focus", () =>{
        setDisableAdd(false);
        setDisableEdit(true);
        setStudentNo("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setDateOfBirth("");
        setisMale(0);
      });
      return clear;
    },[navigation]);

    const getStudentInfo = (id) => {
        fetch("http://192.168.1.8/IT2C_Argarin/Api/student/" + id, {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setDisableAdd(true); 
          setDisableEdit(false);
          if (result.data.student_info !== null) {
            setStudentNo(result.data.student_info.StudentNo);
            setFirstName(result.data.student_info.FirstName);
            setMiddleName(result.data.student_info.MiddleName);
            setLastName(result.data.student_info.LastName);
            setisMale(result.data.student_info.isMale);
            setDateOfBirth(result.data.student_info.DateOfBirth);
          }
        });
    };
    
    useEffect(() =>{
      (async () =>{
        if(route.params !== undefined){
          getStudentInfo(route.params.id);
        }
      })();
    }, []);

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
          fetch("http://192.168.1.8/IT2C_Argarin/Api/student", {
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
      
      const putStudentInfo = () => {
        if (StudentNo && FirstName && MiddleName && LastName && DateOfBirth) {
          setDisableEdit(true);
      
          let formData = new URLSearchParams();
          formData.append("SN", StudentNo);
          formData.append("FN", FirstName);
          formData.append("MN", MiddleName);
          formData.append("LN", LastName);
          formData.append("Sex", isMale);
          formData.append("DOB", DateOfBirth);
          fetch("http://192.168.1.8/IT2C_Argarin/Api/student", {
            method: 'PUT',
            body: formData.toString(),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.meta);
              if (data.meta.code == 200) {
                navigation.navigate("Student");
                setStudentNo("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setisMale(0);
                setDateOfBirth("");
              }
              setDisableEdit(false);
            });
        }
      };
      const deleteStudentInfo = () => {
        if (StudentNo && FirstName && MiddleName && LastName && DateOfBirth) {
          setDisableEdit(true);
      
          let formData = new URLSearchParams();
          formData.append("SN", StudentNo);
          formData.append("FN", FirstName);
          formData.append("MN", MiddleName);
          formData.append("LN", LastName);
          formData.append("Sex", isMale);
          formData.append("DOB", DateOfBirth);
          fetch("http://192.168.1.8/IT2C_Argarin/Api/student", {
            method: 'DELETE',
            body: formData.toString(),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.meta);
              if (data.meta.code == 200) {
                navigation.navigate("Student");
                setStudentNo("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setisMale(0);
                setDateOfBirth("");
              }
              setDisableEdit(false);
            });
        }
      };
    return (
        <>
        <Text style={{alignSelf: "center", fontSize: 20, margin: 10, fontWeight: 600, color:"blue"}}>Add Student</Text>
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
                   <Button
                    onPress={putStudentInfo}
                    title="Edit Student"
                    type="solid"
                    disabled={isDisabledEdit}
                    containerStyle={{
                        marginHorizontal: 16,
                        marginVertical: 8,
                        borderRadius: 8,
                    }}
                    icon={<Icon name="pencil" type="font-awesome" color="white"/>}
                  />
                   <Button
                    onPress={deleteStudentInfo}
                    title="Delete Student"
                    type="solid"
                    disabled={isDisabledEdit}
                    containerStyle={{
                        marginHorizontal: 16,
                        marginVertical: 8,
                        borderRadius: 8,
                    }}
                    icon={<Icon name="trash" type="font-awesome" color="white"/>}
                  />
                </View>
              </>
            }
          />
        </>
      );
}      