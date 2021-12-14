/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  FlatList} from 'react-native';
import VideoPlayer from 'react-native-video-player';
function news_Feed({navigation}) {
  
  const [id,setId]=useState(null);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [videolink, setVideolink] = useState('');
  // const [petId, setPetId] = useState(null);
// const [image,setImage]=useState([require(data.picture)])
  const insertData=(data)=>setData(data);
    // eslint-disable-next-line no-unused-vars
  
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
  const z = [id]
  // const za=[id,petId]
//   const getPetid = (item) => {
//     setPetId(item);
//     console.warn(petId);
//  }
  // const adoptable_Pet = async (petId) => {
  //   console.warn(petId);
  //   let my_url = "https://quaidstp.com/projects/petcare/apply_adopt_pet.php";

  //   await fetch(my_url, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
        
  //       z: [id,petId]
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.warn(data);
        
  //       if (data.status == '1') {
  //         // alert(data.message);
  //         navigation.navigate('Home');
  //       } else if (data.status == '75') {
  //          alert(data.message);
  //       } else if (data.status == '3') {
  //         alert(data.message);
  //       }
  //     })
  //     .catch(error => {
  //       // alert(error)
  //       // eslint-disable-next-line no-undef
  //       const a = url + " Error ==> \n";
  //       console.warn(a, error);
  //       // eslint-disable-next-line no-undef
  //       reject(error);
  //       return error;
  //     });
  // }

const read_News_Feed=async()=>{
     
 let my_url = "https://quaidstp.com/projects/petcare/read_newsfeed_pets.php";

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
          const temp = data.message;
          // let id = temp.map(temp => temp.id);
          // console.warn(id);
           
          
          // console.log(temp);
          //  if (data.message.type=='Dog') {
          //    data.message.splice(2,0,{image:'https://img.icons8.com/color/100/000000/real-estate.png'})
          //  console.warn(data.message)
          //  } 
          
          insertData(temp);
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
    }, 2000);
  });
  if (isLoading) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
  read_News_Feed();
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
              
            <TouchableOpacity style={styles.card} onPress={() => {navigation.push('Pet Profile',item)}}>
              <Image style={styles.image} source={{uri:item.picture_link}} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.type}</Text>
                <Text style={styles.count}>{item.name}</Text>
                <TouchableOpacity style={styles.followButton} onPress={() => {
                  setModalOpen(true)
                  setVideolink(item.video_link);
                }}>
                  <Text style={styles.followButtonText}>Play video</Text>  
                </TouchableOpacity>
              </View>
              <Modal visible={modalOpen}>
                <VideoPlayer
                  video={{ uri: videolink}}
                  videoWidth={1500}
                  videoHeight={2500}
                  disableFullscreen
                  />
        <TouchableOpacity style={styles.modalFollowButton} onPress={()=> setModalOpen(false)}>
                  <Text style={styles.modalFollowButtonText}>Close video</Text></TouchableOpacity>
      </Modal>
            </TouchableOpacity>
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
   backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },modalFollowButton: {
    marginTop: 10,
    height: 45,
    width: 200,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf:'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#3498db',
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  followButtonText:{
    color: "white",
    fontSize:10,
  },
  modalFollowButtonText: {
    color: 'white',
    fontSize: 20,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:15,
    borderColor:"#ebf0f7",
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
    height:45,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#3498db",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
}); 
 export default news_Feed;