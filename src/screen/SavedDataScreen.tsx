import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      console.log(e, 'amldkmlamdlmalmdlm');
    }
  };

  React.useEffect(() => {
    getStoreValue();
  }, []);

  return (
    <View>
      <FlatList
        data={storeData}
        renderItem={({item}) => (
          <View>
            <Text>Speed:{item?.location?.speed}</Text>
            <Text>Longtitude:{item?.location?.longitude}</Text>
            <Text>Latitude:{item?.location?.latitude}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SavedDataScreen;

const styles = StyleSheet.create({});
