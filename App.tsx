import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import TelematicsApp from './src/screen/Temperature';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import TelematicsApp from './src/screen/Temperature';
import MainNavigation from './src/navigation/MainNavigation';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.rootContainer}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={MainNavigation}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  rootContainer: {flex: 1},
});
