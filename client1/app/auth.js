import { AsyncStorage } from "react-native";

export const USER_KEY = "false";

export const onSignIn = () => {
  var that = this;
  var url = 'http://172.23.148.28:4000/api/account/signup'
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
    AsyncStorage.setItem(USER_KEY, "true");
}
export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};