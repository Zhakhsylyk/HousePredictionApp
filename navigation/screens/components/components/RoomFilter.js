import { React, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { room } from "../constants/room";
import DropDownPicker from 'react-native-dropdown-picker';


export const RoomFilter = (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: '1-комнатн.', value: 1},
    {label: '2-комнатн.', value: 2},
    {label: '3-комнатн.', value: 3}
  ]);
  

  const functionHandler = (value) => {
    props.passRoom(value);
  }

  return (
    <View style={styles.screen}>
    <DropDownPicker
    containerStyle={{
      width:137,
    }}
    placeholder="No.Rooms"
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
  { /*<Text>Your room: {value}</Text> */ }

      </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width:180,
    left:10,
  },
  text: {
    fontSize: 24,
  },
});