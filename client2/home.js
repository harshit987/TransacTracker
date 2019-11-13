import React,{Component} from 'react';
import { StyleSheet,FlatList, Text, View,Label, Platform,TextInput, TouchableOpacity, AsyncStorage,Alert, Keyboard } from 'react-native';
import {Router, Stack, Scene} from 'react-native-router-flux';
import {Button} from 'react-native-elements';
import SearchBar from 'react-native-elements';
export default class Home extends Component {
  constructor(props){
      super(props);
      this.state = {
          Name : "",
          Account_holder : this.props.Name,
          Amount : 0,
          dataSource: {},
          search: "",
          url1 : 'http://172.23.148.28:4000/api/account/pay',
          url2 : 'http://172.23.148.28:4000/api/account/history'
      }
      this.dataSource=[];
  }
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
      console.log(this.state.dataSource);
      console.log(text);
      const newData = this.dataSource.filter(function(item) {
        // console.log(item.city);
        //applying filter for the inserted text in search bar
        const itemData = item.PaidTo ? item.PaidTo.toUpperCase() : ''.toUpperCase();
        const itemData1 = item.Payee ? item.Payee.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        // const itemtype=item.pollutant_id;
        // const pm= "PM2.5";
        // console.log(itemtype,pm,itemtype.indexOf(pm));
        console.log(textData,itemData);
        return (itemData.indexOf(textData) > -1)&&(itemData1.indexOf(textData) > -1);
  
    });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSource: newData,
        search:text,
        });
  }
  search = text => {
    // console.log(text);
  }
  clear = () => {
   this.search.clear();
  }
  history() {
    fetch(this.state.url2,{
      method: 'POST',
      headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({"Name" : this.props.Name})
      }).then( (response) => {
      return response.json();
      }).then( (result) => { 
      console.log(result);
      if(result.success){
          //  this.state.dataSource = result.Users;
          this.setState({dataSource : result.Users}); 
          this.dataSource=result.Users;
          console.log(this.state.dataSource);
          // this.props.onPress1(this.state.Roll_no);
         
      }
    }).catch(function (error) {
    console.log("-------- error ------- "+error);
    alert("result:"+error)
    });
  }
  componentDidMount(){
    fetch(this.state.url2,{
      method: 'POST',
      headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({"Name" : this.props.Name})
      }).then( (response) => {
      return response.json();
      }).then( (result) => { 
      console.log(result);
      if(result.success){
           this.state.dataSource = result.Users;
           console.log(this.state.dataSource);
          // this.props.onPress1(this.state.Roll_no);
         
      }
    }).catch(function (error) {
    console.log("-------- error ------- "+error);
    alert("result:"+error)
    });
  }
  pay(){
    fetch(this.state.url1,{
      method: 'POST',
      headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({"PaidTo": this.state.Name, "Payee": this.props.Name,"Amount": this.state.Amount})
      }).then( (response) => {
      return response.json();
      }).then( (result) => { 
      console.log(result);
      if(result.success){
          console.log('Payment Done');

          // this.props.onPress1(this.state.Roll_no);
         
      }
    }).catch(function (error) {
    console.log("-------- error ------- "+error);
    alert("result:"+error)
    });
  }
  render() {
      // console.log(this.props);

      return (
          
        <View style={styles.container}>
        {/* <Label>Pay To</Label> */}
        <TextInput style={styles.inputBox}
        onChangeText={(Name) => this.setState({Name})}
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Name"
        placeholderTextColor = "#002f6c"
        selectionColor="#fff"
        onSubmitEditing={()=> this.Amount.focus()}/>
        {/* <Label>Amount to Pay</Label> */}
        <TextInput style={styles.inputBox}
        onChangeText={(Amount) => this.setState({Amount})}
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Amount"
        placeholderTextColor = "#002f6c"
        selectionColor="#fff"
        ref={(input) => this.Amount = input}
        />
        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="PAY"
          onPress={() => {
            this.pay();
          }}
        />
        <SearchBar
        round
        searchIcon={{ size: 24 }}
        onChangeText={text => this.SearchFilterFunction(text)}
        onClear={text => this.SearchFilterFunction('')}
        placeholder="Type Here..."
        value={this.state.search}
        />
        {/* <Label>Search Past Transaction by Name </Label> */}
        {/* <TextInput style={styles.inputBox}
        onChangeText={(Name) => this.setState({Name})}
        underlineColorAndroid='rgba(0,0,0,0)' 
        placeholder="Search"
        placeholderTextColor = "#002f6c"
        selectionColor="#fff"/>  */}
        <Text>Past Transaction</Text> 
        <Button
          buttonStyle={{ marginTop: 20 }}
          backgroundColor="#03A9F4"
          title="PAY"
          onPress={() => {
            this.history();
          }}
        />
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.Payee},{item.PaidTo},{item.Amount},{item.Date_Time}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />

        {/* <FlatList
              data={this.state.cities}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              //Item Separator View
              renderItem={({ item }) => (
                <React.Fragment>
                <Button
                    title={item.city_name+" "+item.aqi}
                    color={this.getcolour(item.aqi)}
                    // value={item.name}
                    // onPress={this.newCoordinates.bind(this,item)}
                  />
                  <Button title="remove" color="#f194ff" onPress={e=>this.remove(e,item.city_name)}
                  />
                  </React.Fragment>
              )}
              enableEmptySections={true}
              style={{ marginTop: 10 }}
              keyExtractor={(item, index) => index.toString()}
            /> */}

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
  },
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor:'white',
    marginTop: Platform.OS == 'android'? 30 : 0
  },
  textStyle: {
    padding: 10,
  }
});

