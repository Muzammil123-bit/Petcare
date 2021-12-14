/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Linking
} from 'react-native';
function Applicant({route,navigation}) {
    const petId = route.params.id;
    // console.warn(petId);
  const [id,setId]=useState(null);
  const [data, setData] = useState([]);
  // const [petId, setPetId] = useState(null);

  const insertData=(data)=>setData(data);
  
  // AsyncStorage.getItem('Register_key').then((value)=>{
  //   if (value!==null) {
  //     setId(value);
  //   }
  //   else{
  AsyncStorage.getItem('Loginkey').then((value)=>{
           setId(value);
         })
    // }
  // })
  // const getPetid = (id) => {
  //   setPetId(id);
  //   // console.warn(petId);
  // }
 const read_Applicant = async () => {
    // console.warn(petId);
    let my_url = "https://quaidstp.com/projects/petcare/read_adoption_users.php";

    await fetch(my_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        
        z: [id,petId]
      })
    })
      .then(response => response.json())
      .then(data => {
        // console.warn(data);
        
        if (data.status == '1') {
        //   alert(data.message);
            insertData(data.message);
          
        } else if (data.status == '75') {
           alert(data.message);
        } else if (data.status == '3') {
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
    const assign_Applicant = async (adopterId) => {
    // console.warn(petId);
    let my_url = "https://quaidstp.com/projects/petcare/assign_pet.php";

    await fetch(my_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        
        z: [id,petId,adopterId]
      })
    })
      .then(response => response.json())
      .then(data => {
        // console.warn(data);
        
        if (data.status == '1') {
          navigation.navigate('Home');
          alert(data.message);
            
          
        } else if (data.status == '75') {
           alert(data.message);
        } else if (data.status == '3') {
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
  
  const [isLoading,setIsLoading]=useState(true);
  useEffect(()=>{
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });
  if (isLoading) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
    read_Applicant();
  
  return (
        
      <View style={styles.container}>
          
        <FlatList 
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
        data={data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              
              <View style={styles.card}>
              {/* <Image style={styles.image} source={item.image}/> */}
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.count}>Phone:{item.phone}</Text>
                  <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.followButton} onPress={() => {
                           
                    assign_Applicant(item.id);
                }}>
                  <Text style={styles.followButtonText}>Assign</Text>  
                  </TouchableOpacity>
                   <TouchableOpacity style={styles.whatsappFollowButton} onPress={() => {
                     Linking.openURL(
              'http://api.whatsapp.com/send?phone=92' + item.phone
            );      
                    
                }}>
                  <Text style={styles.followButtonText}>Whatsapp</Text>  
                    </TouchableOpacity>
                    </View>
              </View>
            </View>
          )}}/>
      </View>
    );
   
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#ebf0f7"
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    // marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height: 90,
    borderRadius:15,
    borderColor:"#ebf0f7"
  },
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginLeft: 20,
    marginRight: 20,
    marginTop:20,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
      borderRadius: 30,
      justifyContent:'center'
  },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent:'center'
  },
  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#3399ff",
    fontWeight:'bold'
  },
  count:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#6666ff"
  },
  followButton: {
    marginTop:10,
    height:45,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    borderRadius:30,
    backgroundColor: "#3498db",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  whatsappFollowButton: {
    marginTop:10,
    height:45,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    borderRadius:30,
    backgroundColor: "#075e54",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  followButtonText:{
    color: "white",
    fontSize:12,
  },
}); 
 export default Applicant;