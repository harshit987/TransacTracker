import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage,Alert, Keyboard } from 'react-native';

import {Actions} from 'react-native-router-flux';

export default class Form extends Component {

    constructor(props){
        super(props);
        this.registerCall = this.registerCall.bind(this);
        this.state={
            Name:'',
            Roll_no: '',
            password: '',
            url : 'http://172.23.148.28:4000/api/account/'
        }
    }
    onClickListener = () => {
        // Alert.alert(this.state.Usrname+" "+this.state.email+" "+this.state.password , "View_id "+viewId);
            if(this.state.Name || this.state.Name != " "){
            if(this.state.Roll_no){
            if(this.state.password){
                this.registerCall();
            }else{
            Alert.alert("Please enter email");
            }
            }else{
            Alert.alert("Please enter email");
            }
        }else{
        Alert.alert("Please enter username");
        }
    }

    registerCall(){
        var that = this;
        var url = that.state.url + 'signup';
        console.log("url:"+url);
        console.log(this.state.Name);
        fetch(url,{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"Name": this.state.Name, "Roll_no": this.state.Roll_no,"password": this.state.password})
                }).then(function (response) {
                return response.json();
                }).then(function (result) { 
                console.log(result);
                if(result.success){
                    // that.setState({ status: result.error,
                                    // wholeResult: result,
                                // });
                    Alert.alert("User register successfully \n userId: "+that.state.wholeResult.user.uid);
                    // console.log(that.state.wholeResult.user.uid);
                }else{
                // Alert.alert(result.error_msg);
                console.log(result);
        }
        }).catch(function (error) {
        console.log("-------- error ------- "+error);
        alert("result:"+error)
        });
    }
    saveData =async()=>{
        const {Name,Roll_no,password} = this.state;

        //save data with asyncstorage
        let loginDetails={
            Name: Name,
            Roll_no :Roll_no,
            password: password

        }

        if(this.props.type !== 'Login')
        {
            
            // AsyncStorage.setItem('loginDetails', JSON.stringify(loginDetails));
             this.onClickListener();
            // Keyboard.dismiss();
            // alert("You successfully registered. Email: " + email + ' password: ' + password);
            // this.login();
        }
        else if(this.props.type == 'Login')
        {
            try{
                let loginDetails = await AsyncStorage.getItem('loginDetails');
                let ld = JSON.parse(loginDetails);

                if (ld.email != null && ld.password != null)
                {
                    if (ld.email == email && ld.password == password)
                    {
                        alert('Go in!');
                    }
                    else
                    {
                        alert('Email and Password does not exist!');
                    }
                }

            }catch(error)
            {
                alert(error);
            }
        }
    }

    showData = async()=>{
        let loginDetails = await AsyncStorage.getItem('loginDetails');
        let ld = JSON.parse(loginDetails);
        alert('email: '+ ld.email + ' ' + 'password: ' + ld.password);
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

                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.saveData}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
            
        )
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