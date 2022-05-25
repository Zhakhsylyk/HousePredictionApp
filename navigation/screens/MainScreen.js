import * as React from "react";
import { useState, useEffect , useRef} from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  Linking,
} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import DropDownPicker from "react-native-dropdown-picker";
import CityFilter from "./components/components/CityFilter";
import { RoomFilter } from "./components/components/RoomFilter";
import { PriceFilter } from "./components/components/PriceFilter";
import { AreaFilter } from "./components/components/AreaFilter";
import { Header } from "./components/components/Header";
import { useFonts } from "expo-font";
import { TypeFilter } from "./components/components/TypeFilter";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { firebase } from "./../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import MapView, { Marker, Heatmap, PROVIDER_GOOGLE } from "react-native-maps";
import { useDebounce } from "use-debounce";
import * as geofire from "geofire-common";
import Geocoder from "react-native-geocoding";

const { height } = Dimensions.get("window");

export default function MainScreen({ navigation }) {
  const [stats, setStats] = useState([]);
  const ref = firebase.firestore().collection("data");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [room, setRoom] = useState("");
  const [FromPrice, setFromPrice] = useState("");
  const [ToPrice, setToPrice] = useState("");
  const [myLatitudes, setMyLatitudes] = useState([]);
  const [myLongitudes, setMyLongitudes] = useState([]);
  const [myPrices, setMyPrices] = useState([]);
  const [data, setData] = useState([]);
  const [text, setText] = useState("Астана");
  const [geohash, setGeohash] = useState("");
  const [value] = useDebounce(text, 3000);
  const count = useRef(0);
  const [renderComponent, setRenderComponent] = useState(false);
  

  const datas = [];
  const items = [];
  const priceList = [];
  const longitudes = [];
  const latitudes = [];

  useEffect(async () => {
    ref
      .where("houseType", "==", type)
      .where("city", "==", city)
      .where("title", "==", room)
      .where("price", ">", FromPrice)
      .where("price", "<", ToPrice)
      .orderBy("price", "asc")
      .limit(100)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
          priceList.push(doc.data().price);
          latitudes.push(doc.data().Latitude);
          longitudes.push(doc.data().Longitude);
          console.log(priceList);
        });
        setStats(items);

        // console.log(priceList);
        // console.log(areasDistinct);
        // setRenderComponent(true)
        // setRenderComponent(true);
        setMyLatitudes(latitudes);
        setMyLongitudes(longitudes);
        setMyPrices(priceList);
      });
  }, [city, type, room, FromPrice, ToPrice]);

  Geocoder.init("AIzaSyAgFToFZhcicUOVX-0viiYJNWgGMTcZC70");
  Geocoder.from(value)
    .then((json) => {
      var latitude = json.results[0].geometry.location.lat;
      var longitude = json.results[0].geometry.location.lng;
      const hash = geofire.geohashForLocation([latitude, longitude]);
      setGeohash(hash);
    })
    .catch((error) => alert("Не найдено местоположение данного адреса"));

  const hashConst = geohash.slice(0, 5);
  console.log(hashConst);

  
  
  useEffect(async () => {
    ref
      .where("geohash", "==", hashConst)
      .limit(15)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          datas.push(doc.data());
        });
        setData(datas);
      });

  }, [geohash]);

  

  const [loaded] = useFonts({
    Kodchasan: require("../../assets/fonts/Kodchasan-Regular.ttf"),
    Lato: require("../../assets/fonts/Lato-Bold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  let points = new Array(100);
  for (let i = 0; i < points.length; i++) {
    points[i] = {
      latitude: myLatitudes[i],
      longitude: myLongitudes[i],
      weight: myPrices[i],
    };
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.Header}>
          <Header />
        </View>
        <Text
          style={{
            fontFamily: "Lato",
            color: "#085101",
            fontSize: 25,
            marginTop: 40,
            left: 10,
          }}
        >
          Dashboard
        </Text>
        <View style={styles.filterBar}>
          <CityFilter passCity={setCity} />
          <RoomFilter passRoom={setRoom} />
          <TypeFilter passType={setType} />
        </View>
        <View style={{ width: Dimensions.get("window").width, marginTop: 40 }}>
          <Text
            style={{
              fontFamily: "Lato",
              fontWeight: "700",
              fontSize: 20,
              left: 20,
              marginTop: 20,
            }}
          >
            Price Range
          </Text>
          <PriceFilter passFromPrice={setFromPrice} passToPrice={setToPrice} />
        </View>
        {/* <Text>{city}</Text>
        <Text>{type}</Text>
        <Text>{room}</Text>
        <Text>{FromPrice}</Text>
        <Text>{ToPrice}</Text> */}
        <View style={{ borderRadius: 26, overflow: "hidden" }}>
          <MapView
            style={styles.map}
            provider={MapView.PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 43.238949,
              longitude: 76.889709,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Heatmap
              initialRegion={{
                latitude: 51.132148,
                longitude: 71.405953,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              points={points}
              opacity={1}
              gradient={{
                colors: ["black", "purple", "red", "yellow", "white"],
                startPoints: [0.01, 0.04, 0.1, 0.45, 0.9],
                colorMapSize: 2000,
              }}
            ></Heatmap>
          </MapView>
        </View>
        <View
          style={{
            marginTop: 50,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarChart
            data={{
              labels: ["монолитный", "кирпичный", "панельный", "иное"],
              datasets: [
                {
                  data: [52074061, 34879290, 29304860, 41666782],
                },
              ],
            }}
            width={Dimensions.get("window").width - 16}
            height={220}
            yAxisLabel={"Rs"}
            showValuesOnTopOfBars={true}
            chartConfig={{
              backgroundColor: "#4EB058",
              backgroundGradientFrom: "#4EB058",
              backgroundGradientTo: "#08c110",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForLabels: {
                translateX: "10",
                fontWeight: "bold",
              },
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 8,
            }}
          />
        </View>
        <View
          style={{
            marginTop: 50,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarChart
            data={{
              labels: ["Алматы", "Шымкент", "Нур-Султан"],
              datasets: [
                {
                  data: [46018109, 40670549, 36857259],
                },
              ],
            }}
            width={Dimensions.get("window").width - 16}
            height={220}
            yAxisLabel={"Rs"}
            showValuesOnTopOfBars={true}
            chartConfig={{
              backgroundColor: "#4EB058",
              backgroundGradientFrom: "#4EB058",
              backgroundGradientTo: "#08c110",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              decimalPlaces: 0,
              propsForLabels: {
                translateX: "10",
                fontWeight: "bold",
              },
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 8,
            }}
          />
        </View>
        <View
          style={{
            marginTop: 50,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarChart
            data={{
              labels: [
                "1-комнатная",
                "2-комнатная",
                "3-комнатная",
                "4-комнатная",
              ],
              datasets: [
                {
                  data: [20056152, 32916797, 51320680, 86886597],
                },
              ],
            }}
            width={Dimensions.get("window").width - 16}
            height={220}
            showValuesOnTopOfBars={true}
            chartConfig={{
              backgroundColor: "#4EB058",
              backgroundGradientFrom: "#4EB058",
              backgroundGradientTo: "#08c110",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              propsForLabels: {
                translateX: "13",
                fontWeight: "bold",
              },
              style: {
                borderRadius: 8,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 8,
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontFamily: "Lato",
              color: "#085101",
              fontSize: 25,
              top: 20,
              left: 10,
            }}
          >
            Find nearYou!
          </Text>
          <TextInput
            style={styles.inputUnderLine}
            placeholder="Enter adress"
            onChangeText={(text) => setText(text)}
            value={text}
          />
          <View style={{ borderRadius: 26, overflow: "hidden" }}>
            <MapView
              style={styles.map}
              provider={MapView.PROVIDER_GOOGLE}
              initialRegion={{
                latitude: 51.169392,
                longitude: 71.449074,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              { data.map((data) => (
                <Marker
                  coordinate={{
                    latitude: data.Latitude,
                    longitude: data.Longitude,
                  }}
                  onPress={() => Linking.openURL(data.link)}
                />
              ))}
            </MapView>
          </View>
        </View>
        {/* <FlatList
        style={{ height: "100%" }}
        data={data}
        numColumns={1}
        renderItem={({ item }) => (
          <Pressable style={styles.containerFlat}>
            <View style={styles.innerContainer}>
              <Text style={styles.itemHeading}>{item.city}</Text>
              <Text style={styles.itemText}>{item.geohash}</Text>         
            </View>
          </Pressable>
        )}
      /> */}
      </ScrollView>
      {/* <View style={{flex:1, justifyContent:'center',alignItems:'center',bottom:50}}>
        <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Search")}
        >
        <Entypo style={styles.mapIcon} name="map" size={14} color="#fff" />
        
        <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  containerFlat: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    borderRadius: 15,
    margin: 5,
    marginHorizontal: 10,
  },
  map: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    width: 400,
    height: 400,
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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  Header: {
    // position: "absolute",
    top: 0,
    width: Dimensions.get("window").width,
  },
  filterBar: {
    top: 30,
    height: 60,
    flexWrap: "wrap",
    zIndex: 10,
    display: "flex",
    flexDirection: "row",
    width: 380,
  },
  txtinput: {
    textAlign: "center",
    width: 30,
    height: 33,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    padding: 16,
    marginTop: 16,
  },

  containerStyle: {
    backgroundColor: "red",
  },

  image: {
    width: 380,
    height: 240,
    borderRadius: 10,
  },
  textTitle: {
    right: 80,
    paddingTop: 10,
    fontSize: 18,
    fontFamily: "Lato",
  },
  newsContainer: {
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    height: 50,
    width: 150,
    backgroundColor: "#4EB058",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#5ee083",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Lato",
    right: 1,
  },
  mapIcon: {
    right: 10,
  },
  newsItem: {
    marginBottom: 40,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputUnderLine: {
    marginVertical: 30,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderRadius: 16,
    borderColor: "grey",
    padding: 10,
    fontSize: 20,
  },
});
