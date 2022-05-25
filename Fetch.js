import { View, Text, FlatList, StyleSheet, Pressable, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import TypeFilter from './navigation/screens/components/components/TypeFilter';
import CityFilter from './navigation/screens/components/components/CityFilter';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { Chart, VerticalAxis, HorizontalAxis, Line} from 'react-native-responsive-linechart'


const Fetch = () => {
  const [users, setUsers] = useState([]);
  const ref = firebase.firestore().collection("project_dataset");
  const [type,setType] = useState("");
  const [city,setCity] = useState("");
  const [myArray, setMyArray] = useState([]);
  const [myPrices, setMyPrices] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);


  const items = [];
  const priceList = [];
  const areas = [];
  

//   useEffect(async () => {
//     ref
//       // .where("houseType", "==", type)
//       // .where("city", "==" , city)
//       .limit(4)
//       .onSnapshot((querySnapshot) => {

//         querySnapshot.forEach((doc) => {
//           items.push(doc.data());
//           priceList.push(doc.data().price);
//           areas.push(doc.data().houseType);
//           // console.log(priceList);
//           // console.log(areas);
//         });
//         setUsers(items);
//         let areasDistinct = [];
// areas.forEach((val) => {
//     if (!areasDistinct.includes(val)) {
//         areasDistinct.push(val);
//     }
// });
//         // console.log(priceList);
//         // console.log(areasDistinct);
//         setRenderComponent(true)
//         setMyArray(areasDistinct);
//         setMyPrices(priceList);
//       });
//   }, [type,city]);


  return (
    <View style={{ flex: 1, marginTop: 100 }}>
    <View style={{flexDirection:'row'}}>
    <TypeFilter passType={setType}/>
    <CityFilter passCity={setCity}/>
    </View>
    <View style={{marginBottom:200}}></View>
    <View style={{}}>
    <Text style={styles.header}> Line Chart</Text>
    { renderComponent && <LineChart
      data={{
        labels:myArray,
        datasets: [
          {
            data: myPrices
          },
        ],
      }}
      width={380} // from react-native
      height={220}
      yAxisLabel={''}
      chartConfig={{
        propsForLabels: {
          translateX:'7',  
          fontWeight:'bold',      
        },
      backgroundColor: "#4EB058",
      backgroundGradientFrom: "#4EB058",
      backgroundGradientTo: "#1DA11D",
      decimalPlaces:0,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#078720"
      }
    }}
    bezier
    style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />}
      
      </View>

      <FlatList
        style={{ height: "100%" }}
        data={users}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.container}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>{item.price}</Text>
              <Text style={styles.itemText}>{item.area}</Text>
              <Text style={styles.itemText}>{item.city}</Text>
              
            </View>
          </Pressable>
        )}
      />
      
    </View>
  );
};


export default Fetch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  innerContainer: {
    alignItems: "center",
    flexDirection: "column",
  },
  itemHeading: {
    fontWeight: "bold",
  },
  itemText: {
    fontWeight: "300",
  },
});
