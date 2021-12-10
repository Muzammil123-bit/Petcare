import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image
} from 'react-native';






function add_Reminder({navigation,route}){

  const petId = route.params.id;
    // console.warn(petId);

  const [Name,setName]=useState('');
    const [Type,setType]=useState('Food');
    const[Description,setDescription]=useState('');
    const [id,setId]=useState(null)
    
  

  const [time, setTime] = useState('00:00');
// const getId=async()=>{
// AsyncStorage.getItem('Loginkey').then((value)=>{
//           setId(value);
//         })
//         console.warn(id);
// }


     
  //      AsyncStorage.getItem('Register_key').then((value)=>{
  //   if (value!==null) {
  //     setId(value);
  //   }
  //   else{
  // AsyncStorage.getItem('Loginkey').then((value)=>{
  //          setId(value);
  //        })
  //   }
  // })
  const z=[id,Name,time,Description,Type,petId]
  AsyncStorage.getItem('Loginkey').then((value)=>{
           setId(value);
         })

       
  const add_Reminder = async () => {
 let my_url = "https://quaidstp.com/projects/petcare/add_reminder.php";

    await fetch(my_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        
        z: z
      })
    })
      .then(response => response.json())
      .then(data => {
      //  console.warn(data);
       if (data.status=='1') {
         alert(data.message);
         navigation.navigate('Home');
       } else if(data.status=='75') {
        //  alert(data.message);
       }
      })
      .catch(error => {
        // alert(error)
        // eslint-disable-next-line no-undef
        const a = url + " Error ==> \n";
        console.warn(a, error);
        // eslint-disable-next-line no-undef
        reject(error);
        return error;
      });
  }

    
    return (
      <View style={styles.container}>
         <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}
            placeholder="Name"
            placeholderTextColor={'black'}
              value={Name}
              underlineColorAndroid='transparent'
              onChangeText={(petName) => setName(petName)}/>
        </View>
        {/* <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
          <Picker 
          style={styles.inputs}
  selectedValue={Type}
  onValueChange={(itemValue, itemIndex) =>
    setType(itemValue)
  }>
  <Picker.Item label="Dog" value="Dog" />
  <Picker.Item label="Cat" value="Cat" />
  <Picker.Item label="Bird" value="Bird" />
  <Picker.Item label="Fish" value="Fish" />
  <Picker.Item label="Rabbit" value="Rabbit" />
  <Picker.Item label="Pet Poultry" value="pet poultry" />
  <Picker.Item label="Reptile" value="Reptile" />
</Picker>
        </View> */}
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/password/androidL/40/3498db'}}/>
          <Picker 
          style={styles.inputs}
  selectedValue={Type}
  onValueChange={(itemValue) =>
    setType(itemValue)
  }>
  <Picker.Item label="Food" value="Food" />
  <Picker.Item label="Vaccination" value="Vaccination" />
</Picker>
</View>
<View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}
            placeholder="Time"
            placeholderTextColor={'black'}
            value={time}
            keyboardType='numeric'
              underlineColorAndroid='transparent'
              onChangeText={(time) => setTime(time)}/>
        </View>
  <View style={styles.inputDescription}>
    <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
    <TextInput style={styles.inputs}
            placeholder="Description"
            placeholderTextColor={'black'}
      keyboardType='name-phone-pad'
      value={Description}
      underlineColorAndroid='transparent'
      onChangeText={(desc) =>setDescription(desc)}/>
  </View>

        
     
        {/* <TouchableOpacity style={styles.restoreButtonContainer}>
            <Text>Forgot?</Text>
        </TouchableOpacity> */}
         <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>{add_Reminder()}}>
            <Text style={styles.loginText}>Add Reminder</Text>
        </TouchableHighlight>
        {/* <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate('Login')}>
          <Text>Login</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={[styles.buttonContainer, styles.facebookButton]}>
          <View style={styles.socialButtonContent}>
            <Image style={styles.icon} source={{uri: 'https://png.icons8.com/facebook/androidL/40/FFFFFF'}}/>
            <Text style={styles.loginText}>Continue with facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.googleButton]}>
          <View style={styles.socialButtonContent}>
            <Image style={styles.icon} source={{uri: 'https://png.icons8.com/google/androidL/40/FFFFFF'}}/>
            <Text style={styles.loginText}>Sign in with google</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#B0E0E6',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:15,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputDescription: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:100,
      marginBottom:15,
      flexDirection: 'row',
      alignItems:'flex-start'
  },
  inputs:{
      height:45,
      marginLeft:-16,
      borderBottomColor: '#FFFFFF',
    flex: 1,
      color:'black',
  },
  inputsPicker:{
      height:20,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  icon:{
    width:30,
    height:30,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: '#3498db',
  },
  facebookButton: {
    backgroundColor: "#3b5998",
  },
  googleButton: {
    backgroundColor: "#ff0000",
  },
  loginText: {
    color: 'white',
  },
  restoreButtonContainer:{
    width:250,
    marginBottom:15,
    alignItems: 'flex-end'
  },
  socialButtonContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  socialIcon:{
    color: "#FFFFFF",
    marginRight:5
  }
});

export default add_Reminder;
