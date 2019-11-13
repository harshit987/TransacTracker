import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage,Alert, Keyboard } from 'react-native';
import {Button} from 'react-native-elements'
// import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import Login from './login';
import Home from './home';
import Signup from './signup';
export default class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          loggedIn: false,
          signup : false,
          Name : 0      
      }
  }
  loggedIn(Name){
    this.setState({loggedIn : true});
    this.setState({Name : Name});
  }
  render() {
      
          
          if(!this.state.loggedIn&&!this.state.signup)
          {
            return (
            <View>
              <Login
              prop1="123"
               onPress1={(name) => this.loggedIn(name)}
              />
              <Button buttonStyle={{ marginTop: 20 }}
              backgroundColor="transparent"
              textStyle={{ color: "#bcbec1" }}
              title="Sign Up"
              onPress={() => {
                this.setState({signup : true})
                this.setState({loggedIn : false})
              }
              }
              />
            </View>
            )
          }
          else if(this.state.signup)
          {
            return (
              <View>
                <Signup/>
                <Button buttonStyle={{ marginTop: 20 }}
                backgroundColor="transparent"
                textStyle={{ color: "#bcbec1" }}
                title="Log In"
                onPress={() => {
                  this.setState({loggedIn : false})
                  this.setState({signup : false})
                }
                }
                />
              </View>
            )
          }
          else if(this.state.loggedIn)
          {
              return (
                <View>
                  <Home
                   Name={this.state.Name}
                  />
                  <Button buttonStyle={{ marginTop: 20 }}
                  backgroundColor="transparent"
                  textStyle={{ color: "#bcbec1" }}
                  title="Logout"
                  onPress={() => {
                    this.setState({signup : false})
                    this.setState({loggedIn : false})
                  }
                  }
                  />
                </View>
                )
          }
          
     
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
