import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage,Alert, Keyboard } from 'react-native';

import { onSignIn } from "../auth";

export default ({ navigation }) => (
  // <View style={{ paddingVertical: 20 }}>
  //   <Card>
  //     <FormLabel>Email</FormLabel>
  //     <FormInput placeholder="Email address..." />
  //     <FormLabel>Password</FormLabel>
  //     <FormInput secureTextEntry placeholder="Password..." />

  //     <Button
  //       buttonStyle={{ marginTop: 20 }}
  //       backgroundColor="#03A9F4"
  //       title="SIGN IN"
  //       onPress={() => {
  //         onSignIn().then(() => navigation.navigate("SignedIn"));
  //       }}
  //     />
  //   </Card>
  // </View>
  <View style={styles.container}>
  <TextInput style={styles.inputBox}
  onChangeText={(Name) => this.setState({Name})}
  underlineColorAndroid='rgba(0,0,0,0)' 
  placeholder="Name"
  placeholderTextColor = "#002f6c"
  selectionColor="#fff"
  onSubmitEditing={()=> this.Roll_no.focus()}/>
  
  <TextInput style={styles.inputBox}
  onChangeText={(Roll_no) => this.setState({Roll_no})}
  underlineColorAndroid='rgba(0,0,0,0)' 
  placeholder="Roll No"
  placeholderTextColor = "#002f6c"
  selectionColor="#fff"
  onSubmitEditing={()=> this.password.focus()}/>

  <TextInput style={styles.inputBox}
  onChangeText={(password) => this.setState({password})} 
  underlineColorAndroid='rgba(0,0,0,0)' 
  placeholder="Password"
  secureTextEntry={true}
  placeholderTextColor = "#002f6c"
  ref={(input) => this.password = input}
  />
  <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN IN"
        onPress={() => {
          onSignIn().then(() => navigation.navigate("SignedIn"));
        }}
  />
  {/* <TouchableOpacity style={styles.button}> 
      <Text style={styles.buttonText} onPress={this.saveData}>{this.props.type}</Text>
  </TouchableOpacity> */}
  </View>
);
const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  inputBox: {
      width: 300,
      backgroundColor: '#eeeeee', 
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#002f6c',
      marginVertical: 10
  },
  button: {
      width: 300,
      backgroundColor: '#4f83cc',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12
  },
  buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  }
});