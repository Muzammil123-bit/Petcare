/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React,{ useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



function LoginView({navigation}) {
   const [username,setUsername]=useState('');
  const [Password, setPassword] = useState('');
  const [id, setId] = useState(null);
   const z=[username,Password]

  const onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

 

  const checkLogin=async()=>{
 let my_url = "https://quaidstp.com/projects/petcare/login.php";

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
      
        
        AsyncStorage.setItem('Loginkey',data.uid);
        
        
        
         navigation.navigate('Home');
       } else if(data.status=='75') {
         alert(data.message);
       }
       else if (data.status=='0') {
         alert(data.messsage);
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
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
            placeholder="Username"
            placeholderTextColor={'#333333'}
              value={username}
            underlineColorAndroid='transparent'
              onChangeText={(name) =>setUsername(name)}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
            placeholder="Password"
            placeholderTextColor={'black'}
              value={Password}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => setPassword(password)}/>
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => {
           
          checkLogin()
          setUsername('');
          setPassword('');
         
        }}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
        {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight> */}
        <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate('Register')}>
            <Text style={styles.buttonTextStyle}>Register</Text>
        </TouchableOpacity>
      </View>
      
    );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
    flex: 1,
    color: 'black',
  },
  inputIcon:{
    width:30,
    height:30,
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
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
  },
  buttonTextStyle: {
    color:'black',
  }
});


export default LoginView;
