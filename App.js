import { StatusBar } from 'expo-status-bar';
import { Alert } from 'react-native';
import { Image, StyleSheet, Text, View } from 'react-native';
import firebaseConfig from './utils/firebaseConfig';
import React, {useEffect, useState } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import { initializeApp } from 'firebase/app'

export default function App() {

  const app = initializeApp(firebaseConfig);

  const [data, setData] = useState(undefined);

  useEffect(() => {
    getData()
  }, [])

  const getData= ()=>{
    const db = getDatabase(app);
    const starCountRef = ref(db, 'test/string');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const monitoringData = data.split(" ")
      console.log(monitoringData);
      setData(monitoringData);
    });
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style = {styles.viewStyle}>
        <Text style = {styles.textStyle}>Smart Agriculture Monitoring</Text>
      </View>
      <View style = {[styles.viewStyle, styles.dataHolder]}>

        <View style = {[styles.dataContainer, styles.card]}>
          <View style = {[styles.cardStyle]}>
            {/* <Text>Image</Text> */}
            <Image source={require('./assets/temperature.png')} style = {styles.imageStyle}/>
          </View>
          <View style = {[styles.cardStyle]}>
            <Text style={styles.textTitle}>Temperature</Text>
            <Text style = {styles.textData}>{(data)? data[0] + ' °C': ''}</Text>
          </View>
        </View>

        <View style = {[styles.dataContainer, styles.card]}>
          <View style = {[styles.cardStyle]}>
            <Text style={styles.textTitle}>Humidity</Text>
            <Text style = {styles.textData}>{(data)? data[1] + "%" : ''}</Text>
          </View>
          <View style = {[styles.cardStyle]}>
           <Image source={require('./assets/humidity.png')} style = {styles.imageStyle}/>
          </View>
        </View>

        <View style = {[styles.dataContainer, styles.card]}>
          <View style = {[styles.cardStyle]}>
            <Image source={require('./assets/soil.png')} style = {styles.imageStyle}/>
          </View>
          <View style = {[styles.cardStyle]}>
            <Text style={styles.textTitle}>Soil Moisture</Text>
            <Text style = {styles.textData}>{(data)? data[2] + ' %' : ''}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingTop: 40,
    flexDirection: 'column'
  },
  viewStyle : {
    // borderColor : '#000000',
    // borderWidth : 2,
    // padding : 5,
    marginVertical : 10,
  },
  textStyle : {
    textAlign: 'center',
    fontSize : 35,
    fontWeight : 'bold',
    textTransform : 'uppercase',
  },
  dataHolder : {
    flex : 1,
    // justifyContent : 'space-around'
  },
  dataContainer : {
    flexDirection: 'row',
    // borderColor : '#ff0000',
    // borderWidth : 3,
    height: 150,
    padding : 2
  },
  cardStyle: {
    flex: 1,
    // borderColor : 'green',
    // borderWidth: 1,
    // margin: 2,
    // width : '100%'
    justifyContent : 'center',
    alignItems : 'center'
  },
  card : {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    paddingVertical : 5,
    marginHorizontal: 8,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 5,
  },

  imageStyle : {
    height : '100%',
    width: '100%',
    resizeMode : 'contain'
  },

  textTitle : {
    fontSize: 25,
    fontWeight : 'bold',
    margin: 2
  },
  textData : {
    fontSize : 20,
  }
});
