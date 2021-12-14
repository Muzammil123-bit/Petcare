/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

function Home({navigation}) {
    const state = {
      data: [
        {id:1, title: "Pets", 'image':require("./assets/Home/pets.png")},
        {id:2, title: "Vets", image:require("./assets/Home/vets.png")},
        {id:3, title: "Adopt Pet", image:require("./assets/Home/adopt.png")} ,
        { id: 4, title: "Reminder", image: require("./assets/Home/reminders.png") },
        { id: 5, title: "News Feed", image: require("./assets/Home/pets.png") },
        {id:6, title: "Logout", image:require("./assets/Home/logout.png")}
      ]
    };




  
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            // if(item.id==1){
            //   return(
            //     <View>
            //     <TouchableOpacity style={styles.card} onPress={() => {navigation.navigate('Pets')}}>
            //       <Image style={styles.cardImage} source={{uri:item.image}}/>
            //     </TouchableOpacity>

            //      <View style={styles.cardHeader}>
            //       <View style={{alignItems:"center", justifyContent:"center"}}>
            //         <Text style={styles.title}>{item.title}</Text>
            //       </View>
            //     </View>
               
            //   </View>
            //   )
            // }
            // else  if(item.id==1){
            //   return(
            //     <View>
            //     <TouchableOpacity style={styles.card} onPress={() => {navigation.navigate('Vets')}}>
            //       <Image style={styles.cardImage} source={{uri:item.image}}/>
            //     </TouchableOpacity>

            //      <View style={styles.cardHeader}>
            //       <View style={{alignItems:"center", justifyContent:"center"}}>
            //         <Text style={styles.title}>{item.title}</Text>
            //       </View>
            //     </View>
               
            //   </View>
            //   )
            // }
            // else{
            return (
              <View>
                <TouchableOpacity style={styles.card} onPress={() => {
                  if (item.title === 'Logout') {
                    AsyncStorage.removeItem('Loginkey');
                    navigation.navigate('Login');
                  }
                  else {
                    navigation.navigate(item.title)
                  }
                }}>
                  <Image style={styles.cardImage} source={item.image}/>
                </TouchableOpacity>

                <View style={styles.cardHeader}>
                  <View style={{alignItems:"center", justifyContent:"center"}}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                </View>
               
              </View>
            )
          }}/>
           {/* <View style={styles.containerSignout}>
           <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>checkRegister()}>
            <Text style={styles.loginText}>Sign out</Text>
        </TouchableHighlight>
        </View> */}
      </View>
    );
  }

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:40,
    backgroundColor:'#f6f6f6',
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#f6f6f6",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 40,
    backgroundColor:"#e2e2e2",
    //flexBasis: '42%',
    width:120,
    height:120,
    borderRadius:60,
    alignItems:'center',
    justifyContent:'center'
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 80,
    width: 80,
    alignSelf: 'center',
    borderRadius:10
  },
  title:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  loginText: {
    color: 'white',
  },buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },loginButton: {
    backgroundColor: '#3498db',
  },
   containerSignout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     marginTop:40,
     marginBottom:40,
    backgroundColor: '#B0E0E6',
  },
});    

export default Home;