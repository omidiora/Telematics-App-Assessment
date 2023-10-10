import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TelematicsApp from '../screen/Temperature';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SavedDataScreen from '../screen/SavedDataScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'dashboard';
          } else if (route.name === 'Store') {
            iconName = 'store';
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        header: () => null,
      })}>
      <Tab.Screen
        name="Dashboard"
        component={TelematicsApp}
        options={{tabBarLabel: 'Dashboard'}}
      />
      <Tab.Screen name="Store" component={SavedDataScreen} 
        options={{tabBarLabel: 'Store Data'}}/>
    </Tab.Navigator>
  );
}

export default MainNavigation;
