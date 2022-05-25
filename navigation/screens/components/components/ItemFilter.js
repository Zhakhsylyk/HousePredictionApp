import React,{ useState } from "react";
import { city } from "../constants/city";
import { Text, View } from "react-native";
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import NumberPlease from "react-native-number-please";



function ItemFilter() {
  const [selectedTeam, setSelectedTeam] = useState({})
  const [selectedTeams, setSelectedTeams] = useState([])
  // const [pizzas, setPizzas] = useState(initialValues);
  // const pizzaNumbers = [{ id: "pizza", label: "?", min: 0, max: 99 }];

  return (
    <View style={{alignItems:'center'}}>
    <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select City</Text>
    <SelectBox
    label='City'
    options={K_OPTIONS}
    value={selectedTeam}
    onChange={onChange()}
    hideInputFilter={false}
    width="80%"
  />
  <View style={{ height: 40}} />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select houseType</Text>
      <SelectBox
        label="HouseType"
        width="90%"
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
      
      <Text style={{ fontSize: 20, paddingBottom: 20 ,paddingTop:40}}>Select Number of Rooms</Text>
    <SelectBox
    label='Number of Rooms'
    options={K_OPTIONS}
    value={selectedTeam}
    onChange={onChange()}
    hideInputFilter={false}
    width="80%"
  />
    </View>
  );
  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
  }
  function onChange() {
    return (val) => setSelectedTeam(val)
  }
}

export default ItemFilter;
