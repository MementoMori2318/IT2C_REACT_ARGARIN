import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { ListItem, Icon, Button } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";

export default function TeacherInfoScreen({ navigation }) {
    const route = useRoute();

    if (route.params !== undefined) {
      console.log(route.params.id);
    };

    const [TeacherNo, setTeacherNo] = React.useState("");
    const [FirstName, setFirstName] = React.useState("");
    const [MiddleName, setMiddleName] = React.useState("");
    const [LastName, setLastName] = React.useState("");
    const [Subject, setSubject] = React.useState("");
    const [isMale, setisMale] = React.useState(0);

    const [isDisabledAdd, setDisableAdd] = useState(false);
    const [isDisabledEdit, setDisableEdit] = useState(false);

    React.useState(() => {
      const clear = navigation.addListener("focus", () =>{
        setDisableAdd(false);
        setDisableEdit(true);
        setTeacherNo("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setSubject("");
        setisMale(0);
      });
      return clear;
    },[navigation]);

    const getTeacherInfo = (id) => {
        fetch("http://192.168.1.8/IT2C_Argarin/Api/teacher/" + id, {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setDisableAdd(true); 
          setDisableEdit(false);
          if (result.data.teacher_info !== null) {
            setTeacherNo(result.data.teacher_info.TeacherNo);
            setFirstName(result.data.teacher_info.FirstName);
            setMiddleName(result.data.teacher_info.MiddleName);
            setLastName(result.data.teacher_info.LastName);
            setisMale(result.data.teacher_info.isMale);
            setSubject(result.data.teacher_info.Subject);
          }
        });
    };
    
    useEffect(() =>{
      (async () =>{
        if(route.params !== undefined){
          getTeacherInfo(route.params.id);
        }
      })();
    }, []);

    const postTeacherInfo = () => {
        console.log("TeacherNo = " + TeacherNo);
        console.log("FirstName = " + FirstName);
        console.log("MiddleName = " + MiddleName);
        console.log("LastName = " + LastName);
        console.log("Subject = " + Subject);
        console.log("isMale = " + isMale);
      
        if (TeacherNo && FirstName && MiddleName && LastName && Subject) {
          setDisableAdd(true);
      
          let formData = new FormData();
            formData.append("TN", TeacherNo);
            formData.append("FN", FirstName);
            formData.append("MN", MiddleName);
            formData.append("LN", LastName);
            formData.append("Sex", isMale);
            formData.append("SUB", Subject);
          fetch("http://192.168.1.8/IT2C_Argarin/Api/teacher", {
            method: 'POST',
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.meta.code == 200) {
                navigation.navigate("Teacher");
                setTeacherNo("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setisMale(0);
                setSubject("");
              }
              setDisableAdd(false);
            });
        }
      };
      
      const putTeacherInfo = () => {
        if (TeacherNo && FirstName && MiddleName && LastName && Subject) {
          setDisableEdit(true);
      
          let formData = new URLSearchParams();
          formData.append("TN", TeacherNo);
          formData.append("FN", FirstName);
          formData.append("MN", MiddleName);
          formData.append("LN", LastName);
          formData.append("Sex", isMale);
          formData.append("SUB", Subject);
          fetch("http://192.168.1.8/IT2C_Argarin/Api/teacher", {
            method: 'PUT',
            body: formData.toString(),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.meta);
              if (data.meta.code == 200) {
                navigation.navigate("Teacher");
                setTeacherNo("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setisMale(0);
                setSubject("");
              }
              setDisableEdit(false);
            });
        }
      };
      const deleteTeacherInfo = () => {
        if (TeacherNo && FirstName && MiddleName && LastName && Subject) {
          setDisableEdit(true);
      
          let formData = new URLSearchParams();
          formData.append("TN", TeacherNo);
          formData.append("FN", FirstName);
          formData.append("MN", MiddleName);
          formData.append("LN", LastName);
          formData.append("Sex", isMale);
          formData.append("SUB", Subject);
          fetch("http://192.168.1.8/IT2C_Argarin/Api/teacher", {
            method: 'DELETE',
            body: formData.toString(),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.meta);
              if (data.meta.code == 200) {
                navigation.navigate("Teacher");
                setTeacherNo("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setisMale(0);
                setSubject("");
              }
              setDisableEdit(false);
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
                      <ListItem.Title>Teacher No</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Input
                      placeholder="Enter Teacher No"
                      onChangeText={setTeacherNo}
                      value={TeacherNo}
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
                      <ListItem.Title>Subject</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Input
                      placeholder="Enter Subject"
                      onChangeText={setSubject}
                      value={Subject}
                    />
                  </ListItem>

                  <Button
                    onPress={postTeacherInfo}
                    title="Add Teacher"
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
                    onPress={() => navigation.navigate("Teacher")}
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
                    onPress={putTeacherInfo}
                    title="Edit Teacher"
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
                    onPress={deleteTeacherInfo}
                    title="Delete Teacher"
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