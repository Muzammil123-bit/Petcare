/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{ useState} from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ActivityIndicator
} from 'react-native';

import LoginView from './src/Login';
import RegisterView from './src/Register';
import Home from './src/Home';
import pets from './src/Pets';
import addPet from './src/Add Pet';
import pet_Profile from './src/Pet Profile';
import vets from './src/Vets';
import adopt_Pet from './src/Adopt Pet';
import reminder from './src/Reminder';
import add_Reminder from './src/Add Reminder';
import Applicant from './src/Applicants';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

// const RootStackScreen=({navigation})=>{
//    <RootStack.Navigator initialRouteName='Login'>
//           <RootStack.Screen name="Register" component={RegisterView}/>  
//        <RootStack.Screen name="Login" component={LoginView}/>
//     </RootStack.Navigator>
// }

function App() {
  const [id,setId]=useState(null);
 
  
AsyncStorage.getItem('Loginkey').then((value)=>{
           setId(value);
         })
  
  const [isLoading,setIsLoading]=useState(true);
  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  });
  if (isLoading) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
 if(id!==null){
 return(<NavigationContainer>
      
        <RootStack.Navigator initialRouteName='Home'>
     <RootStack.Screen name="Home" component={Home} />
     <RootStack.Screen name="Add Reminder" component={add_Reminder} />
     <RootStack.Screen name="Applicant" component={Applicant}/> 
         <RootStack.Screen name="Adopt Pet" component={adopt_Pet}/>
         <RootStack.Screen name="Vets" component={vets}/> 
         <RootStack.Screen name="Pet Profile" component={pet_Profile}/> 
         <RootStack.Screen name="Pets" component={pets} options={({ navigation}) => ({
           headerRight: () => (
            <View style={styles.containerAdd}>
           <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>navigation.navigate('Add Pet')}>
            <Text style={styles.loginText}>Add Pet</Text>
        </TouchableHighlight>
        </View>
        
          )
         })}/> 
         <RootStack.Screen name="Reminder" component={reminder} /> 
       <RootStack.Screen name="Add Pet" component={addPet}/>   

    </RootStack.Navigator>
    </NavigationContainer>);
 }
 else
 {
  return (
    <NavigationContainer>
      
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Register" component={RegisterView}/>
        <Stack.Screen name="Adopt Pet" component={adopt_Pet} />
        <Stack.Screen name="Applicant" component={Applicant}/> 
         <Stack.Screen name="Home" component={Home}/> 
         <Stack.Screen name="Add Reminder" component={add_Reminder}/> 
         <Stack.Screen name="Vets" component={vets}/> 
         <Stack.Screen name="Pet Profile" component={pet_Profile}/>
         <Stack.Screen name="Pets" component={pets} options={({ navigation}) => ({
           headerRight: () => (
            <View style={styles.containerAdd}>
           <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>navigation.navigate('Add Pet')}>
            <Text style={styles.loginText}>Add Pet</Text>
        </TouchableHighlight>
        </View>
        
          )
         })}/> 
         <Stack.Screen name="Reminder" component={reminder}/> 
       <Stack.Screen name="Add Pet" component={addPet}/>   
       <Stack.Screen name="Login" component={LoginView}/>
        

    </Stack.Navigator>
    </NavigationContainer>
  );
 }
}
const styles = StyleSheet.create({
  loader:{flex:1,justifyContent:'center',alignItems:'center'},
  loginText: {
    color: 'white',
  },buttonContainer: {
    height:45,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    
    width:150,
    borderRadius:30,
  },loginButton: {
    backgroundColor: '#3498db',
  },
   containerAdd: {
    justifyContent: 'flex-end',
    alignItems:'flex-end',
  },
})

export default App;
