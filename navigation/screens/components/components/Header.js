import { useFonts } from 'expo-font'
import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';




export const Header = () => {
    const navigation = useNavigation(); 
    const [loaded] = useFonts({
       Kodchasan: require('../../../../assets/fonts/Kodchasan-Bold.ttf'), 
       Lato_Black: require('../../../../assets/fonts/Lato-Black.ttf'),
    })
   
    if(!loaded){
        return null;
    }
  return (
    <View style={styles.container}>
    <View style={styles.flexContainer}>
    <IonIcons
    style={styles.backIcon}
    name = "arrow-back"
    size={34}
    color="#fff"
    onPress={() => navigation.navigate('Home')}
    />
    <Text style={styles.headerText}>Welcome</Text>
    <View style={styles.iconItem}>
    <Foundation
    style={styles.tagIcon}
    name="pricetag-multiple"
    size={18}
    color="#fff"
    />
    <AntDesign
    style={styles.homeIcon}
    name="home"
    size={34}
    color="#fff"
    />
    </View>
    </View>
    </View>
  )
}
const styles = StyleSheet.create({
container : {
    top:0,
    backgroundColor:'#4EB058',
    height:110,
},

flexContainer: {
    top:60,
    display:'flex',
    flexDirection:'row',
},
headerText: {
    flex:1,
    textAlign:'center',
    fontSize:24,
    fontFamily:'Lato_Black',
    color:"#fff",

},

iconItem:{
      right:15,
},

tagIcon: {
   position:'absolute',
   left:20,
   top:5,
},
backIcon: {
    left:10,
}
})
