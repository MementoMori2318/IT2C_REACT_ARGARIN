import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { ListItem, Icon, Button } from "@rneui/themed";

export default function StudentInfoScreen({ navigation }) {
    const [StudentNo, setStudentNo] = React.useState("");
    const [FirstName, setFirstName] = React.useState("");
    const [MiddleName, setMiddleName] = React.useState("");
    const [LastName, setLastName] = React.useState("");
    const [DateOfBirth, setDateOfBirth] = React.useState("");
    const [IsMale, setIsMale] = React.useState(0);

    const [isDisabledAdd, setDisableAdd] = useState(false);

    const postStudentInfo = () =>{
        console.log("StudentNo = " + StudentNo);
        console.log("FirstName = " + FirstName);
        console.log("MiddleName = " + MiddleName);
        console.log("LastName = " + LastName);
        console.log("DateOfBirth = " + DateOfBirth);
        console.log("IsMale = " + IsMale);

        if(StudentNo && FirstName && MiddleName && LastName && DateOfBirth && IsMale){
            setDisableAdd(true);

            let formData = new FormData();
            formData.append("StudentNo", StudentNo);
            formData.append("FN = " + FirstName);
            formData.append("MN = " + MiddleName);
            formData.append("LN = " + LastName);  
            formData.append("Sex = " + IsMale);
            formData.append("DOB = " + DateOfBirth);
            fetch('http://localhost/IT2C_Argarin/Api/student',{
          method: 'POST',
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
                setIsMale("");
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
                        selectedIndex={IsMale}
                        onPress={(index) => setIsMale(index)}
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
                    disabled={isDisabledAdd}
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