import {React , useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import { Dimensions } from 'react-native-web';


export const PriceFilter = (props) => {

    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);
    const [value, setValue] = useState(0);

    const million = 1000000;

       props.passFromPrice(fromValue*million)
       props.passToPrice(toValue*million)


    return (
         <View style={styles.container}>
         <Text style={{fontSize:13,fontWeight:'bold',marginTop:100,left:15}}> {fromValue} MM KZT - {toValue} MM KZT</Text>

              <View  style={{width:400,marginTop:-20}}>
                   <RangeSlider 
                   styleSize='small'
                   min={5} max={70}
                        fromValueOnChange={value => setFromValue(value)}
                        toValueOnChange={value => setToValue(value)}
                        initialFromValue={5}
                        initialToValue={70}
                   />
              </View>
              </View>
    );
}
const styles = StyleSheet.create({
    container : {
        flex:1,
        marginTop:-75,
        
    }
})

