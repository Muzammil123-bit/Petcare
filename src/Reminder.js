/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert} from 'react-native';
function reminder({navigation}) {
  
  const [id,setId]=useState(null);
  const[data,setData]=useState([]);

  const insertData=(data)=>setData(data);
  //   const state = {
  //     modalVisible:false,
  //     userSelected:[],
  //     data: [
  //       {id:1,  name: "Community",   image:"https://img.icons8.com/clouds/100/000000/groups.png",  type:'Dog',age:6,gender:'Male'},
  //       {id:2,  name: "Housing",    image:"https://img.icons8.com/color/100/000000/real-estate.png",       count:234.722},
  //       {id:3,  name: "Jobs",       image:"https://img.icons8.com/color/100/000000/find-matching-job.png", count:324.723} ,
  //       {id:4,  name: "Personal",   image:"https://img.icons8.com/clouds/100/000000/employee-card.png",    count:154.573} ,
  //       {id:5,  name: "For sale",   image:"https://img.icons8.com/color/100/000000/land-sales.png",        count:124.678} ,
  //     ]
  //   };
  
  // const clickEventListener = (item) => {
  //   Alert.alert('Message', 'Item clicked. '+item.name);
  // }
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
const z=[id]
  const read_Reminder=async()=>{
     
 let my_url = "https://quaidstp.com/projects/petcare/read_reminders.php";

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
        if (data.status=='1') {
          // console.warn(data.message)
          // if (data.message.type=='Reptile') {
          //   data.message.splice(2,0,{image:'https://img.icons8.com/color/100/000000/real-estate.png'})
          // console.warn(data.message)
          // } 
          
          insertData(data.message)
  
       } else if(data.status=='75') {
        //  alert(data.message);
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
    }, 500);
  });
  if (isLoading) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
  read_Reminder();
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
              
            <View style={styles.card} onPress={() => {clickEventListener(item)}}>
              <Image style={styles.image} source={{uri:'https://img.icons8.com/clouds/100/000000/groups.png'}}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.count}>Type:{item.type}</Text>
                <Text style={styles.count}>Time:{item.time}</Text>
                <Text style={styles.count}>{item.value}</Text>
                {/* <TouchableOpacity style={styles.followButton} onPress={()=> navigation.push('Pet Profile',data)}>
                  <Text style={styles.followButtonText}>Explore now</Text>  
                </TouchableOpacity> */}
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
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:2,
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
    borderRadius:30,
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
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "white",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  followButtonText:{
    color: "#dcdcdc",
    fontSize:12,
  },
}); 
 export default reminder;