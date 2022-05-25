import { React, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';


export const TypeFilter = (props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'монолитный', value: 'монолитный'},
      {label: 'кирпичный', value: 'кирпичный'},
      {label: 'панельный', value: 'панельный'},
      {label: 'иное', value: 'иное'}
    ]);
    
    const functionHandler = (value) => {
      props.passType(value);
    }

    return (
      <View style={styles.screen}>
      <DropDownPicker
      containerStyle={{
        width:137,
        
      }}
      placeholder="House type"
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
          { /*<Text>Your type: {value}</Text> */ }

        </View>
    );
    
  }
 
  const styles = StyleSheet.create({
    screen: {
        flex: 1,
        width:140,
        left:22,
    },
    text: {
      fontSize: 24,
    },
    picker: {
      width: 174,
    },
  });


  export default TypeFilter;