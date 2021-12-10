/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import React, {useState} from 'react';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
function vets() {
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });
  const insertData = data => setData(data);
  

  // AsyncStorage.getItem('Register_key').then((value)=>{
  //   if (value!==null) {
  //     setId(value);
  //   }
  //   else{
  AsyncStorage.getItem('Loginkey').then(value => {
    setId(value);
  });
  // }
  // })
  const z = [id];
  // eslint-disable-next-line no-unused-vars

  const read_Vet = async () => {
    let my_url = 'https://quaidstp.com/projects/petcare/read_vets.php';

    await fetch(my_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        z: z,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === '1') {
          // console.warn(data.message);
          insertData(data.message);
        } else if (data.status === '75') {
          //  alert(data.message);
        }
      })
      .catch(error => {
        // alert(error)
        const a = url + ' Error ==> \n';
        console.warn(a, error);
        return error;
      });
  };

  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  read_Vet();
  return (
    <View style={styles.container}>
     
      <FlatList
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={data}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
               
              {/* <Image style={styles.image} source={{uri:item.image}}/> */}
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.count}>Phone:{item.phone}</Text>
                <Text style={styles.count}>Address:{item.address}</Text>
                <Text style={styles.count}>{item.time}</Text>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={() => setModalOpen(true)}>
                  <Text style={styles.followButtonText}>Show map</Text>
                </TouchableOpacity>
                <Modal visible={modalOpen}>
        <Text style={styles.modalName}>Vet Location</Text>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude:parseFloat( item.latitude),
              longitude:parseFloat( item.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
          }}>
          <Marker coordinate = {{latitude:parseFloat( item.latitude), longitude:parseFloat( item.longitude)}}
         title={"title"}
         description={"description"}/>
          {/* <TouchableOpacity style={styles.followButton} onPress={()=> setModalOpen(false)}>
                  <Text style={styles.followButtonText}>Map</Text>
                </TouchableOpacity> */}
        </MapView>
        <TouchableOpacity style={styles.modalFollowButton} onPress={()=> setModalOpen(false)}>
                  <Text style={styles.modalFollowButtonText}>Close map</Text></TouchableOpacity>
      </Modal>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#ebf0f7',
  },
  map: {
    flex: 1,
  },
  contentList: {
    flex: 1,
  },
  cardContent: {
    // marginLeft:20,
    marginTop: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#ebf0f7',
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    justifyContent: 'center',
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    borderRadius: 30,
  },
  name: {
    fontSize: 18,
    flex: 1,
    alignSelf: 'center',
    color: '#3399ff',
    fontWeight: 'bold',
  },
  modalName: {
    fontSize: 30,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: '#6666ff',
  },
  followButton: {
    marginTop: 10,
    height: 45,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    borderRadius: 30,
    backgroundColor: '#3498db',
    borderWidth: 1,
    borderColor: '#dcdcdc',
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
  followButtonText: {
    color: 'white',
    fontSize: 12,
  },
   modalFollowButtonText: {
    color: 'white',
    fontSize: 20,
  },
});
export default vets;
