import React, { useState,useEffect } from 'react'
import {View,Text,Dimensions,StyleSheet,Button,Linking} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Map} from './components/components/Map'
import { SearchBar } from './components/components/SearchBar'
import { collection,Firestore,query,where } from 'firebase/firestore'
import axios from 'axios';
import * as geofirestore from 'geofirestore';
import * as geofire from 'geofire-common';
import Geocoder from "react-native-geocoding";
import { firebase } from "./../../firebase";
import MapView , {Marker, MarkerAnimated, PROVIDER_GOOGLE} from 'react-native-maps';
import { render } from 'react-dom'



export const MapScreen = ({navigation,route}) => {
  const address = route.params.text;
  const [latitude,setLatitude] = useState('');
  const [longitude,setLongitude] = useState('');
  const [geohash,setGeohash] = useState('');
  const [data,setData] = useState([]);
  const [renderComponent,setRenderComponent] = useState(false);
  
  
  Geocoder.init('AIzaSyAgFToFZhcicUOVX-0viiYJNWgGMTcZC70');
  Geocoder.from(address)
  .then(json => {
    var latitude = json.results[0].geometry.location.lat;
    var longitude = json.results[0].geometry.location.lng;
    const hash = geofire.geohashForLocation([latitude, longitude]);
    setGeohash(hash);

  })
  .catch(error => alert('Не найдено местоположение данного адреса'));
   
 
  const hashConst = geohash.slice(0, 5);
  console.log(hashConst);
  const ref = firebase.firestore().collection("data");



  useEffect(async () => {
  
   ref
      .onSnapshot((querySnapshot) => {
        const items =[];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
          console.log(items);
        })
        setData(items);

      setRenderComponent(true);
      }
      )
    },[])


    console.log(data);
    function renderElement(){
      if (typeof data !== 'undefined' && data.length > 0) {
         return data.map((data) => <Marker coordinate={{latitude:data.Latitude, longitude:data.Longitude}} onPress={() => Linking.openURL(data.link)} />)
    }
  }
  return (
  <>
    {renderComponent && <View style={styles.container}>
    <View style={styles.mapContainer}>
    <MapView style={styles.map} 
    provider = { MapView.PROVIDER_GOOGLE }
    initialRegion={{
      latitude: 43.238949,
      longitude: 76.889709,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>
    {renderElement()}
    </MapView>
      </View>
    </View>}
    </>
    
  )
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})