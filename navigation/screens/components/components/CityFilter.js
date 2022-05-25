import { React, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { city } from "../constants/city";
import DropDownPicker from 'react-native-dropdown-picker';


function CityFilter(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Алматы', value: 'Алматы'},
    {label: 'Шымкент', value: 'Шымкент'},
    {label: 'Нур-Султан', value: 'Нур-Султан (Астана)'}
  ]);

  const functionHandler = (value) => {
    props.passCity(value);
  }

  return (
    <View style={styles.screen}>
    <DropDownPicker
    containerStyle={{
      width:133,
    }}
    
    placeholder="City"
    placeholderStyle={{
      color: "#D2D2D2",
      fontWeight: "bold"
    }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={functionHandler}
      />
      { /*<Text>Your city: {value}</Text> */}
      </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    left:1,
  },
  text: {
    fontSize: 24,
  },
});
export default CityFilter;
