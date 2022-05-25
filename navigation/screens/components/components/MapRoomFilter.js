import { React, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { room } from "../constants/room";


export const MapRoomFilter = () => {
  const [numRoom, setNumRoom] = useState("");
  const roomList = room.map((room) => (
    <Picker.Item label={room.label} value={room.value} />
  ));
  return (
    <View style={styles.screen}>
    <Picker
      selectedValue={numRoom}
      onValueChange={(value, index) => setNumRoom(value)}
      mode="dropdown"
      style={styles.picker}
    >
      {roomList}
    </Picker>
  </View>
);
};
const styles = StyleSheet.create({
screen: {
  flex: 1,
  height:100,
  top:1,
  left:28,
  justifyContent: "center",
  alignItems: "center",
},
text: {
  fontSize: 24,
  
},
picker: {
  width: 135,
  
},
});
