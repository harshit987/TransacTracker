import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {Text, View} from 'react-native';

import Login from './pages/Login';
import Signup from './pages/Signup';

export default class Routes extends Component {
    constructor(){
        super();
        this.state = {
            loggedIn: false,
            user: 'harshit'
        }
    }
    render() {
        return (
            <Router barButtonIconStyle ={styles.barButtonIconStyle}
                hideNavBar={false} 
                navigationBarStyle={{backgroundColor: '#1565c0',}} 
                titleStyle={{color: 'white',}}
            >
                
                <Stack key="root">
                <Scene key="login" component={Login} title="Login"/>
                <Scene key="signup" component={Signup} title="Sign up"/>
                </Stack>
            </Router>
            
        )
    }
}

const styles = {
    barButtonIconStyle: {
        tintColor: 'white'
    }
}