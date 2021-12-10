/* eslint-disable no-undef */
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob'





function addPet({ navigation }) {

  const [Name, setName] = useState('');
  const [Type, setType] = useState('Dog');
  const [Age, setAge] = useState(null);
  const [gender, setGender] = useState('Male');
  const [id, setId] = useState(null);
  const [imageData, setImageData] = useState(null);

          
         

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
  AsyncStorage.getItem('Loginkey').then((value) => {
    setId(value);
  })
  const choosePicture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true,
    }).then(image => {
      setImageData(image.data);
    });
    
  }
  
  // const z=[id,Name,Type,Age,gender]
  
  // const za=[{email:'email'},{ name: 'image',    // note: the name will be image, it will not be changed
  //         filename: 'image.jpg',
  //         type: 'image/jpg',
  //        data: imageData,}]
  console.log(imageData);
  
  const add_Pet = async () => {
    let my_url = "https://quaidstp.com/projects/test/uploadImage.php";

    RNFetchBlob.fetch('POST', my_url, {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      // custom content type
      { name: 'image', filename: 'image_1.jpg', type: 'image/jpg', data: imageData },
    {email:'muzammil'}

    ]).then((resp) => {
      // ...
      console.warn(resp);
    }).catch((err) => {
      // ...
      console.log(err);
    })
    
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
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
          <Picker 
          style={styles.inputs}
  selectedValue={Type}
  onValueChange={(itemValue) =>
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
        </View>
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/password/androidL/40/3498db'}}/>
          <Picker 
          style={styles.inputs}
  selectedValue={gender}
  onValueChange={(itemValue) =>
    setGender(itemValue)
  }>
  <Picker.Item label="Male" value="male" />
  <Picker.Item label="Female" value="female" />
</Picker>
        </View>
        
        
        <View style={styles.inputContainer}>
          <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/envelope/androidL/40/3498db'}}/>
          <TextInput style={styles.inputs}
            placeholder="Age"
            placeholderTextColor={'black'}
            keyboardType='phone-pad'
            value={Age}
            
            underlineColorAndroid='transparent'
            onChangeText={(petAge) =>setAge(petAge)}/>
        </View>

        
     
        <TouchableOpacity style={styles.restoreButtonContainer} onPress={() => {
          choosePicture();
        }}>
            <Text style={styles.loginText}>Select Image</Text>
        </TouchableOpacity> 
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>{add_Pet()}}>
            <Text style={styles.loginText}>Add Pet</Text>
        </TouchableHighlight>
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
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
    flex: 1,
      color:'black'
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
     height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:150,
    borderRadius: 30,
    backgroundColor: '#3b5998',
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

export default addPet;
