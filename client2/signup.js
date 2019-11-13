import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage,Alert, Keyboard } from 'react-native';
import {Button} from 'react-native-elements'
import {Router, Stack, Scene} from 'react-native-router-flux';
export default class Signup extends Component {
  constructor(props){
      super(props);
      this.state = {
          Name : "",
          Roll_no : 0,
          password : "",
          url : 'http://172.23.148.28:4000/api/account/signup'
      }
  }
  signup() {
    
    fetch(this.state.url,{
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"Name": this.state.Name, "Roll_no": this.state.Roll_no,"password": this.state.password})
        }).then(function (error,response) {
        return response.json();
        }).then(function (result) { 
        console.log(result);
        if(result.success){
            Alert("Registered succesfully");
        }
    }).catch(function (error) {
    console.log("-------- error ------- "+error);
    alert("result:"+error)
    });
  }
  render() {
    return(
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
          title="SIGN UP"
          onPress={() => {
            this.signup()
          }}
    />
    </View> )  
  }
}


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
