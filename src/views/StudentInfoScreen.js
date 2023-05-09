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
                </View>
              </>
            }
          />
        </>
      );
}      