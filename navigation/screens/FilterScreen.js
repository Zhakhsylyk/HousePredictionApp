import React from "react";
import { View, Text } from "react-native";
import ItemFilter from "./components/components/ItemFilter";

function FilterScreen() {
  return (
    <View style={{flex: 1,backgroundColor:'#fff'}}>
    <View style={{ width: '100%', alignItems: 'center' }}>
    <Text style={{ fontSize: 30, paddingBottom: 20 }}>Filter</Text>
  </View>
  <ItemFilter />
  </View>
  );
}

export default FilterScreen;
