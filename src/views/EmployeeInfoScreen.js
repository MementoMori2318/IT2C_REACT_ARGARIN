import React, { useState, useEffect } from "react";
import { View, FlatList, Text } from "react-native";
import { ListItem, Icon, Button } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";

export default function EmployeeInfoScreen({ navigation }) {
    const route = useRoute();

    if (route.params !== undefined) {
      console.log(route.params.id);
    };

    const [EmployeeNo, setEmployeeNo] = React.useState("");
    const [FirstName, setFirstName] = React.useState("");
    const [MiddleName, setMiddleName] = React.useState("");
    const [LastName, setLastName] = React.useState("");
    const [Job, setJob] = React.useState("");
    const [isMale, setisMale] = React.useState(0);

    const [isDisabledAdd, setDisableAdd] = useState(false);
    const [isDisabledEdit, setDisableEdit] = useState(false);

    React.useState(() => {
      const clear = navigation.addListener("focus", () =>{
        setDisableAdd(false);
        setDisableEdit(true);
        setEmployeeNo("");
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setJob("");
        setisMale(0);
      });
      return clear;
    },[navigation]);

    const getEmployeeInfo = (id) => {
        fetch("http://172.18.114.201/IT2C_Argarin/Api/employee/" + id, {
          method: 'GET',
        })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setDisableAdd(true); 
          setDisableEdit(false);
          if (result.data.employee_info !== null) {
            setEmployeeNo(result.data.employee_info.EmployeeNo);
            setFirstName(result.data.employee_info.FirstName);
            setMiddleName(result.data.employee_info.MiddleName);
            setLastName(result.data.employee_info.LastName);
            setisMale(result.data.employee_info.isMale);
            setJob(result.data.employee_info.Job);
          }
        });
    };
    
    useEffect(() =>{
      (async () =>{
        if(route.params !== undefined){
          getEmployeeInfo(route.params.id);
        }
      })();
    }, []);

    const postEmployeeInfo = () => {
        console.log("EmployeeNo = " + EmployeeNo);
        console.log("FirstName = " + FirstName);
        console.log("MiddleName = " + MiddleName);
        console.log("LastName = " + LastName);
        console.log("Job = " + Job);
        console.log("isMale = " + isMale);
      
        if (EmployeeNo && FirstName && MiddleName && LastName && Job) {
          setDisableAdd(true);
      
          let formData = new FormData();
            formData.append("EN", EmployeeNo);
            formData.append("FN", FirstName);
            formData.append("MN", MiddleName);
            formData.append("LN", LastName);
            formData.append("Sex", isMale);
            formData.append("JOB", Job);
          fetch("http://172.18.114.201/IT2C_Argarin/Api/employee", {
            method: 'POST',
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.meta.code == 200) {
                navigation.navigate("Employee");
                setEmployeeNo("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setisMale(0);
                setJob("");
              }
              setDisableAdd(false);
            });
        }
      };
      
      const putEmployeeInfo = () => {
        if (EmployeeNo && FirstName && MiddleName && LastName && Job) {
          setDisableEdit(true);
      
          let formData = new URLSearchParams();
          formData.append("EN", EmployeeNo);
          formData.append("FN", FirstName);
          formData.append("MN", MiddleName);
          formData.append("LN", LastName);
          formData.append("Sex", isMale);
          formData.append("JOB", Job);
          fetch("http://172.18.114.201/IT2C_Argarin/Api/employee", {
            method: 'PUT',
            body: formData.toString(),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.meta);
              if (data.meta.code == 200) {
                navigation.navigate("Employee");
                setEmployeeNo("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setisMale(0);
                setJob("");
              }
              setDisableEdit(false);
            });
        }
      };
      const deleteEmployeeInfo = () => {
        if (EmployeeNo && FirstName && MiddleName && LastName && Job) {
          setDisableEdit(true);
      
          let formData = new URLSearchParams();
          formData.append("EN", EmployeeNo);
          formData.append("FN", FirstName);
          formData.append("MN", MiddleName);
          formData.append("LN", LastName);
          formData.append("Sex", isMale);
          formData.append("JOB", Job);
          fetch("http://172.18.114.201/IT2C_Argarin/Api/employee", {
            method: 'DELETE',
            body: formData.toString(),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.meta);
              if (data.meta.code == 200) {
                navigation.navigate("Employee");
                setEmployeeNo("");
                setFirstName("");
                setMiddleName("");
                setLastName("");
                setisMale(0);
                setJob("");
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
                      <ListItem.Title>Employee No</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Input
                      placeholder="Enter Employee No"
                      onChangeText={setEmployeeNo}
                      value={EmployeeNo}
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
                      <ListItem.Title>Job</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Input
                      placeholder="Enter Job"
                      onChangeText={setJob}
                      value={Job}
                    />
                  </ListItem>

                  <Button
                    onPress={postEmployeeInfo}
                    title="Add Employee"
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
                    onPress={() => navigation.navigate("Employee")}
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
                    onPress={putEmployeeInfo}
                    title="Edit Employee"
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
                    onPress={deleteEmployeeInfo}
                    title="Delete Emplooye"
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