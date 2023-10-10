import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import {BODY_IMAGE} from '../util';
import {horizontalScale, verticalScale} from '../Metric';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import QuickCard from '../Component/QuickCard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {
  getWeather,
  dailyForecast,
  showWeather,
  getLocation,
} from 'react-native-weather-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generateRandomMetrics = () => {
  const speed = Math.random() * 120; // Speed in km/h
  const rpm = Math.random() * 8000; // RPM (revolutions per minute)
  const fuelLevel = Math.random() * 100; // Fuel level in percentage
  const engineTemperature = Math.random() * 100; // Engine temperature in °C
  const latitude = Math.random() * 180 - 90; // Latitude (-90 to 90)
  const longitude = Math.random() * 360 - 180; // Longitude (-180 to 180)

  return {
    speed,
    rpm,
    fuelLevel,
    engineTemperature,
    latitude,
    longitude,
  };
};

const TelematicsApp = () => {
  const [metrics, setMetrics] = useState(generateRandomMetrics());
  const [isJourneyActive, setIsJourneyActive] = useState(false);
  const [getLocations, SetLocation] = useState({});
  const [weather, setWeather] = useState({});

  const saveItemKeyword = async keyword => {
    try {
      // Retrieve existing keywords from storage
      const existingKeywordsJSON = await AsyncStorage.getItem('SaveItem');
      const existingKeywords = existingKeywordsJSON
        ? JSON.parse(existingKeywordsJSON)
        : [];

      // Add the new keyword to the existing keywords array
      existingKeywords.push(keyword);

      // Save the updated keywords array to storage
      await AsyncStorage.setItem('SaveItem', JSON.stringify(existingKeywords));
      console.log('Search keyword saved to local storage.');
    } catch (error) {
      console.error('Error saving search keyword to local storage:', error);
    }
  };

  useEffect(() => {
    let temp;
    let wind;

    getLocation().then(location => {
      getWeather({
        country: 'NG',
        city: 'Lagos',
        key: 'e254471b8a1270b3c8f2c3cc65c07dd9',
        lat: location.coords.latitude,
        lon: location.coords.longitude,
        unit: 'metric',
      }).then(() => {
        let data = new showWeather();
        temp = data.temp;
        wind = data.wind;
        setWeather(data);
      });
    });
  }, []);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        SetLocation(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message, '111');
      });
  }, []);

  const startJourney = () => {
    setIsJourneyActive(true);
    startDataCapture();
    saveItemKeyword({
      location: getLocations,
      weather: weather,
      metric: metrics,
      journey: isJourneyActive,
      fuel: metrics.fuelLevel.toFixed(2),
      rpm: metrics.rpm.toFixed(2),
    });
  };

  const endJourney = () => {
    setIsJourneyActive(false);
    stopDataCapture();
  };

  const startDataCapture = () => {
    const interval = setInterval(() => {
      const newMetrics = generateRandomMetrics();
      setMetrics(newMetrics);

      // Check for abnormal values and display warnings
      if (newMetrics.engineTemperature > 95) {
        // Alert.alert('Warning', 'High engine temperature detected!');
      }

      if (newMetrics.fuelLevel < 20) {
        // Alert.alert('Warning', 'Low fuel level detected!');
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  };

  const stopDataCapture = () => {
    // Stop capturing data when the journey ends
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={BODY_IMAGE.card}
        style={styles.card}
        imageStyle={{borderRadius: 10}}>
        <Text style={styles.journey}>
          Journey Status: {isJourneyActive ? 'Active' : 'Inactive'}
        </Text>

        <TouchableOpacity
          style={styles.button}
          title={isJourneyActive ? 'End Journey' : 'Start Journey'}
          onPress={isJourneyActive ? endJourney : startJourney}>
          <Text style={styles.journeyText}>
            {isJourneyActive ? 'End Journey' : 'Start Journey'}
          </Text>
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.quickCardContainer}>
        <QuickCard
          image={
            <SimpleLineIcons
              name="speedometer"
              size={50}
              color={metrics.speed.toFixed(2) > 70 ? 'red' : 'green'}
            />
          }
          subTitle="Speed"
          title={metrics.speed.toFixed(2) + 'km/h'}
        />

        <QuickCard
          image={
            <MaterialCommunityIcons
              name="fan-speed-2"
              size={50}
              color={metrics.rpm.toFixed(2) > 2000 ? 'red' : 'green'}
            />
          }
          subTitle="RPM"
          title={metrics.rpm.toFixed(2)}
        />

        <QuickCard
          image={
            <MaterialCommunityIcons
              name="fuel"
              size={50}
              color={
                metrics.engineTemperature.toFixed(2) <= 35 ? 'green' : 'red'
              }
            />
          }
          subTitle="Temp."
          title={metrics.engineTemperature.toFixed(2) + '°C'}
        />
      </View>

      <View style={styles.quickCardContainer}>
        <QuickCard
          image={<Entypo name="location-pin" size={50} color={'green'} />}
          subTitle="GPS(Lat.)"
          title={getLocation.latitude?.toFixed(5)}
        />
        <QuickCard
          image={<Entypo name="location-pin" size={50} color={'green'} />}
          subTitle="GPS(Long.)"
          title={getLocation.longitude?.toFixed(2)}
        />

        <QuickCard
          image={
            <FontAwesome6
              name={
                metrics.fuelLevel.toFixed(2) <= 30
                  ? 'temperature-half'
                  : 'temperature-high'
              }
              size={50}
              color={metrics.fuelLevel.toFixed(2) <= 60 ? 'red' : 'green'}
            />
          }
          subTitle="Fuel Level"
          title={metrics.fuelLevel.toFixed(2) + '%'} // title={
        />
      </View>

      <Text>
        {/* GPS Location: {getLocation.latitude.toFixed(5)},{' '}
        {getLocation.longitude.toFixed(5)} */}
      </Text>

      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: horizontalScale(15),
          marginLeft: 10,
        }}>
        Additional Safety Feature (Weather)
      </Text>
      <View style={styles.quickCardContainer}>
        <QuickCard
          image={
            <FontAwesome6 name="cloud-moon-rain" size={50} color={'green'} />
          }
          subTitle="Rain"
          title={weather?.description}
        />
        <QuickCard
          image={<Entypo name="air" size={50} color={'green'} />}
          subTitle="Wind"
          title={weather?.wind}
        />

        <QuickCard
          image={
            <MaterialCommunityIcons
              name={'air-humidifier'}
              size={50}
              color={'green'}
            />
          }
          subTitle="Humidity"
          title={weather?.humidity}
        />
      </View>
    </View>
  );
};

export default TelematicsApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  journey: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingTop: horizontalScale(80),
  },
  card: {
    width: verticalScale(360),
    height: horizontalScale(180),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30,
    // borderRadius:330,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: verticalScale(17),
    width: verticalScale(160),
    borderRadius: 5,
    padding: 10,
  },
  journeyText: {
    color: 'orange',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  quickCardContainer: {
    marginTop: verticalScale(40),
    marginBottom: verticalScale(3),
    marginHorizontal: horizontalScale(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});