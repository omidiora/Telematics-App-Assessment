import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {verticalScale} from '../Metric';

const SavedDataScreen = () => {
  const [storeData, setStoreData] = useState([]);

  const getStoreValue = async () => {
    try {
      const value = await AsyncStorage.getItem('SaveItem');
      if (value !== null) {
        setStoreData(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    getStoreValue();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.save}>Recent Save Journey</Text>
      <FlatList
        contentContainerStyle={{paddingBottom: 340}}
        data={storeData}
        ListEmptyComponent={() => (
          <Text style={styles.noSaved}>No Saved Data</Text>
        )}
        renderItem={({item}) => (
          console.log(item?.metric?.speed),
          <View style={styles.storeContainer}>
            <Text style={styles.text}>Speed:{item?.metric?.speed?.toFixed(2)}</Text>
            <Text style={styles.text}>
              Longtitude:{item?.location?.longitude}
            </Text>
            <Text style={styles.text}>Latitude:{item?.location?.latitude}</Text>
            <Text style={styles.text}>Wind:{item?.weather?.wind}</Text>
            <Text style={styles.text}>Rain:{item?.weather?.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SavedDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  storeContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 0.4,
    borderColor: 'grey',
    padding: 20,
    width: '80%',
    margin: 30,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  save: {
    fontWeight: 'bold',
    margin: 30,
    color: 'orange',
    fontSize: verticalScale(20),
  },
  noSaved: {
    fontWeight: 'bold',
    marginLeft: 29,
    fontSize: 18,
    color: 'black',
  },
});
