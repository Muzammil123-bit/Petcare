/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import RNFS from 'react-native-fs';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Modal} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob'


function pets({navigation}) {
  
  const [id,setId]=useState(null);
  const [data, setData] = useState([]);
  // const [petId, setPetId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [lat, setLat] = useState(null);
  // const [path, setPath] = useState('');
  // const [mime, setMime] = useState('');
  const [long, setLong] = useState(null);
  const [adoptStatus, setAdoptStatus] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState(false);
 
  

  const insertData=(data)=>setData(data);
    // const state = {
    //   modalVisible:false,
    //   userSelected:[],
    //   data: [
    //     // {id:1,  name: "Community",   image:"https://img.icons8.com/clouds/100/000000/groups.png",  type:'Dog',age:6,gender:'Male'},
    //     // {id:2,  name: "Housing",    image:"https://img.icons8.com/color/100/000000/real-estate.png",       count:234.722},
    //     // {id:3,  name: "Jobs",       image:"https://img.icons8.com/color/100/000000/find-matching-job.png", count:324.723} ,
    //     // {id:4,  name: "Personal",   image:"https://img.icons8.com/clouds/100/000000/employee-card.png",    count:154.573} ,
    //     // {id:5,  name: "For sale",   image:"https://img.icons8.com/color/100/000000/land-sales.png",        count:124.678} ,
    //   ]
    // };
  
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
  const z = [id]
  Geolocation.getCurrentPosition(data => setLat(data.coords.latitude));
  Geolocation.getCurrentPosition(data => setLong(data.coords.longitude));
  // console.log(long);
  // console.log(lat);
  
  // let za=[id,petId]
  // const getPetid = (id) => {
  //   setPetId(id);
  //   // console.warn(petId);
  // }
  const select_id = (item) => setPetId(item);
  
  let petId = null;
  let path = '';
  let mime = '';
  const chooseVideo = () => {
    
   ImagePicker.openPicker({
        mediaType: "video",
   }).then((video) => {
     console.log(video);
        path=(video.path);
        mime=(video.mime);
        post_Video(petId)
      })
      
    
  }
  
  const post_Video = async (pet_Id) => {
   
    
        // go do that thing
        let my_url = 'https://quaidstp.com/projects/petcare/add_pet_video.php';
        // let my_url = 'https://quaidstp.com/projects/test/uploadImage.php';

        await RNFetchBlob.fetch('POST', my_url, {
          Authorization: "Bearer access-token",
          otherHeader: "foo",
          'Content-Type': 'multipart/form-data',
        }, [
          // custom content type
          { name: 'video', filename: 'Video.mp4', data: RNFetchBlob.wrap(path) },
          { name: 'uid', data: id },
          { name: 'pet_id', data: pet_Id }
      
      
        ]).then(response => response.json())
          .then((resp) => {
            alert(resp.message);
            // ...
            // console.log(resp);
            // if (resp.status==1) {
            //   navigation.navigate('Home');
            // } else if(resp.status==2) {
            //   alert(resp.message);
            // } else if (resp.status == 75) {
            //   alert(resp.message);
            // } else {
            //   alert(resp.message);
            // }
          }).catch((err) => {
            // ...
            console.log(err);
          })
    }
  const pet_Tracking = async (petId) => {
    // console.warn(petId);
    let my_url = "https://quaidstp.com/projects/petcare/add_track.php";

    await fetch(my_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        
        z: [id,petId,lat,long]
      })
    })
      .then(response => response.json())
      .then(data => {
        // console.warn(data);
        
        if (data.status == '1') {
          alert(data.message);
          navigation.navigate('Home');
        } else if (data.status == '75') {
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
   const location_Pet = async (petId) => {
    // console.warn(petId);
    let my_url = "https://quaidstp.com/projects/petcare/read_pet_track.php";

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
          // alert(data.message);
          const temp = data.message[0];
          setLatitude(temp.latitude);
          setLongitude(temp.longitude);
           setModalOpen(true);
        } else if (data.status == '75') {
           alert(data.message);
        } else if (data.status == '2') {
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
 const adoptable_Pet = async (petId) => {
    // console.warn(petId);
    let my_url = "https://quaidstp.com/projects/petcare/pet_adopt.php";

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
          alert(data.message);
          navigation.navigate('Home');
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
  const read_Pet=async()=>{
     
 let my_url = "https://quaidstp.com/projects/petcare/read_self_pets.php";

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
        console.log(data);
        if (data.status=='1') {
          const temp=data.message
          temp.forEach((temp) => {
            if (temp.adopt_status=='true') {
              setAdoptStatus(true);
            }
            if (temp.tracking_status == 'true') {
              setTrackingStatus(true);
            }
          });
         
          
          
          
          // console.warn(temp);
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
    }, 3000);
  });
  if (isLoading) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size='large'/>
      </View>
    )
  }
  read_Pet();
  return (
        
      <View style={styles.container}>
          
        <FlatList 
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
        data={data}
        keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              
              
              <TouchableOpacity style={styles.card} onPress={() => { navigation.push('Pet Profile', item) }}>
              
                <Image style={styles.image} source={{uri:item.picture_link}} />
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.type}</Text>
                  <Text style={styles.count}>{item.name}</Text>
                  <View style={styles.buttonContainer}>
                    {!adoptStatus ?(<TouchableOpacity style={styles.followButton} onPress={() => {
        
                      adoptable_Pet(item.id);
                    }}>
                      <Text style={styles.followButtonText}>Adopt</Text>
                    </TouchableOpacity>): null}
                    {adoptStatus ? (<TouchableOpacity style={styles.followButton} onPress={() => {
        
                      navigation.push('Applicant', item)
                    }}>
                      <Text style={styles.followButtonText}>Applicants</Text>
                    </TouchableOpacity>) : null}
                  </View>
                  <View style={styles.secondButtonContainer}>
                  <TouchableOpacity style={styles.followButton} onPress={()=>{navigation.push('Add Reminder',item)}}>
                      <Text style={styles.followButtonText}>Add Reminder</Text>
                    </TouchableOpacity>
                    {!trackingStatus ? (<TouchableOpacity style={styles.followButton} onPress={() => {
                      pet_Tracking(item.id);
                    }}>
                      <Text style={styles.followButtonText}>Start Tracking</Text>
                    </TouchableOpacity>) : null}
                    {trackingStatus ? (<TouchableOpacity style={styles.followButton} onPress={() => location_Pet(item.id)}>
                      <Text style={styles.followButtonText}>Location</Text>
                    </TouchableOpacity>) : null}
                    <TouchableOpacity style={styles.followButton} onPress={() => {
                      petId=item.id
                      chooseVideo();
                    }
          }>
                      <Text style={styles.followButtonText}>Upload Video</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Modal visible={modalOpen}>
        <Text style={styles.modalName}>Pet Location</Text>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude:parseFloat(latitude),
              longitude:parseFloat(longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }}>
          <Marker coordinate = {{latitude:parseFloat(latitude), longitude:parseFloat(longitude)}}
         title={"title"}
         description={"description"}/>
          {/* <TouchableOpacity style={styles.followButton} onPress={()=> setModalOpen(false)}>
                  <Text style={styles.followButtonText}>Map</Text>
                </TouchableOpacity> */}
        </MapView>
        <TouchableOpacity style={styles.modalFollowButton} onPress={()=> setModalOpen(false)}>
                  <Text style={styles.modalFollowButtonText}>Close map</Text></TouchableOpacity>
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
  cardContent: {
     marginLeft:-25,
    marginTop:10,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent:'center'
  },
  secondButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft:-75
  },
  followButton: {
    marginTop:10,
    height:40,
    width:105,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#3498db",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  modalFollowButton: {
    marginTop: 1,
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
  modalName: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
   map: {
    flex: 1,
  },
}); 
 export default pets;