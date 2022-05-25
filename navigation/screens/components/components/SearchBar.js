import {React,useState,useRef} from 'react'
import {View,Text,TextInput,StyleSheet,Dimensions} from 'react-native'
import AntIcon from "react-native-vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import BottomSheet from "react-native-gesture-bottom-sheet";
import IonIcons from "react-native-vector-icons/Ionicons";



export const SearchBar = (props) => {
    const bottomSheet = useRef();
    const navigation = useNavigation();
    const [text, setText] = useState('');


  return (
    <View style={styles.searchSection}>
    <IonIcons
    style={styles.backIcon}
    name = "arrow-back"
    size={34}
    color="#FFF"
    onPress={() => navigation.navigate('Main')}
    />
    <BottomSheet hasDraggableIcon ref={bottomSheet} height={800} />
    <View>
      <TextInput
        style={styles.TextInput}
        placeholderTextColor="gray"
        placeholder="Astana, Kazakhstan"
        returnKeyType="search"
        onSubmitEditing={() => navigation.navigate('Map',{text:text})}
        onChangeText={text => setText(text)}
      ></TextInput>
    </View>
    <View>
      <AntIcon
        style={styles.searchIcon}
        name="search1"
        size={24}
        color="#A89D9D"
      />
    </View>
    <View>
      <AntIcon
        style={styles.filterIcon}
        name="filter"
        size={24}
        color="#FFF"
        onPress={() => bottomSheet.current.show()}
      />
    </View>
  </View>
  )
}
const styles = StyleSheet.create({
    searchSection: {
        padding: 10,
        paddingBottom:13,
        paddingTop: 50,
        backgroundColor: "#4EB058",
        position: "absolute",
        top: 0,
        display: "flex",
        width: Dimensions.get("window").width,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      },
      TextInput: {
        backgroundColor: "#F0EAEA",
        height: 51,
        width: 310,
        fontSize: 20,
        borderRadius: 15,
        padding: 15,
        left:5,
      },
      filterIcon: {
        right:5,
      },
      searchIcon: {
        right: 30,
      },
})
