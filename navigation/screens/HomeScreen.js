import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import Fetch from '../../Fetch';
import axios from 'axios'





export default function HomeScreen({navigation,route}) {
  const [loaded] = useFonts({
    Kodchasan: require('../../assets/fonts/Kodchasan-Regular.ttf'),
    Lato:require('../../assets/fonts/Lato-Bold.ttf'),
  })
  if(!loaded){
    return null;
  }
  


  return (
    <View style={styles.container}>
    <ImageBackground source={require('../../assets/background.png')} resizeMode="cover" style={styles.backgroundImage}>
    </ImageBackground>
    <Image
    style={styles.image}
    resizeMode="contain"
    source={require('../../assets/house_icon.png')}
  />
  <View style={styles.titleText}>
  <Text style={styles.titleUpper}>House Price Prediction</Text>
  <Text style={styles.titleLower}>Analytics</Text>
  </View>
  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}><Text style={styles.buttonText}>Get started</Text></TouchableOpacity>
  <StatusBar style="auto" />
    </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image : {
    bottom:100,
    width: 225, 
    height: 225
  },

  titleText: {
    bottom:120,
  },
  titleUpper: {
    fontFamily: "Lato",
    fontWeight:"600",
    fontSize:28,
    
  },
  titleLower:{
    fontFamily:"Kodchasan",
    fontSize:24,
  },
  backgroundImage: {
    position:'absolute',
    width: '100%',
     height: '100%'
  },
  button: {
    position:'absolute',
    width:346,
    bottom:20,
    marginVertical:20,
    height:50,
    marginHorizontal:10,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor: '#4EB058'
  },
  buttonText : {
    textTransform: 'uppercase',
    color:'#fff',
    fontSize:16,
    fontWeight:'bold'
  }
});
