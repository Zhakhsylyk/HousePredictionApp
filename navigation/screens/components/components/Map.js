import React from 'react'
import {View,Text,Dimensions,StyleSheet} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView , {PROVIDER_GOOGLE,Marker} from 'react-native-maps';
import { data } from './../constants/coordinates';


export const Map = () => {
  // const Markers = data.map((data) => (
  //   <Marker coordinate={{latitude:data.latitude, longitude:data.longitude}} />
  // )
  // )
  return (
    <View style={styles.mapContainer}>
    <MapView style={styles.map} 
    provider = { MapView.PROVIDER_GOOGLE }
    initialRegion={{
      latitude: 43.238949,
      longitude: 76.889709,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>
    </MapView>
      </View>
  )
}

const styles = StyleSheet.create({
  container : {
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})