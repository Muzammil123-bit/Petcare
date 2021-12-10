/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  Image} from 'react-native';



function RegisterView({navigation}){


  const [Username,setUsername]=useState('');
    const [Name,setName]=useState('');
     const [Password,setPassword]=useState('');
     const[Phone,setPhone]=useState(null);


      const z=[Username,Password,Name,Phone]

const checkRegister=async()=>{
 let my_url = "https://quaidstp.com/projects/petcare/register.php";

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
      
        
        AsyncStorage.setItem('Loginkey',data.uid.toString());
        
        
        
         navigation.navigate('Home');
       } else if(data.status=='75') {
         alert(data.message);
       }
       else if (data.status=='0') {
         alert(data.messsage);
       }
       else if(data.status=='2'){
         alert(data.message);
       }
      })
      .catch(error => {
        // alert(error)
        const a = url + " Error ==> \n";
        console.warn(a, error);
        reject(error);
        return error;
      });
  }
    return (
      <View style={styles.container}>
         <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}
            placeholder="Username"
            placeholderTextColor={'black'}
              value={Username}
              underlineColorAndroid='transparent'
              onChangeText={(username) => setUsername(username)}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}
            placeholder="Password"
            placeholderTextColor={'black'}
              value={Password}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => setPassword(password)}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/password/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}
            placeholder="Name"
            placeholderTextColor={'black'}
              keyboardType='name-phone-pad'
              value={Name}
              underlineColorAndroid='transparent'
              onChangeText={(name) =>setName(name)}/>
        </View>
        
        
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}
            placeholder="Phone Number"
            placeholderTextColor={'black'}
            keyboardType='phone-pad'
            value={Phone}
            
            underlineColorAndroid='transparent'
            onChangeText={(phone) =>setPhone(phone)}/>
        </View>

        
     
        {/* <TouchableOpacity style={styles.restoreButtonContainer}>
            <Text>Forgot?</Text>
        </TouchableOpacity> */}
         <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>checkRegister()}>
            <Text style={styles.loginText}>Register</Text>
        </TouchableHighlight>
        <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.buttonTextStyle}>Login</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={[styles.buttonContainer, styles.fabookButton]}>
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
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
    flex: 1,
      color:'black'
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
  fabookButton: {
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
  }, buttonTextStyle: {
    color:'black',
  }
});

export default RegisterView;