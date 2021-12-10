import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image} from 'react-native';



function pet_Profile({route}){
    // console.warn(route);
    const data=route.params;
    // const usableData=data.pop();
    // console.warn(usableData);
     return (
      <View style={styles.container}>
         <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
          <Text style={styles.inputs}
              placeholder="Type"
              underlineColorAndroid='transparent'>
                  {data.type}
            </Text>
        </View>
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
           <Text style={styles.inputs}
              placeholder="Name"
              underlineColorAndroid='transparent'>
                  {data.name}
            </Text>
        </View>
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/password/androidL/40/3498db'}}/>
           <Text style={styles.inputs}
              placeholder="Age"
              underlineColorAndroid='transparent'>
                  {data.age}
            </Text>
        </View>
        
        
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
           <Text style={styles.inputs}
              placeholder="Gender"
              underlineColorAndroid='transparent'>
                  {data.gender}
            </Text>
        </View>

        
     
        {/* <TouchableOpacity style={styles.restoreButtonContainer}>
            <Text>Forgot?</Text>
        </TouchableOpacity> */}
         {/* <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>{add_Pet()}}>
            <Text style={styles.loginText}>Add Pet</Text>
        </TouchableHighlight> */}
        {/* <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate('Login')}>
          <Text>Login</Text>
        </TouchableOpacity> */}
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
      height:28,
      fontSize:20,
      fontWeight:'bold',
      marginLeft:30,
      borderBottomColor: '#FFFFFF',
      flex:1,
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
  }
});

export default pet_Profile;
