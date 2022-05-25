import {React,useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import NumberPlease from "react-native-number-please";
 
export const AreaFilter = () => {
  const initialValues = [{ id: "area", value: 40 }];
  const [area, setArea] = useState(initialValues);
  const areaNumbers = [{ id: "area", label: "м²", min: 1, max: 99 }];
 
  return (
    <View style={styles.container}>
      <NumberPlease
        digits={areaNumbers}
        values={area}
        onChange={(values) => setArea(values)}
      />
    { /*<Text>Your area: {}</Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    width:50,
    bottom:20,
    height:100,
    alignItems:'center',
    justifyContent:'center',
  }
})