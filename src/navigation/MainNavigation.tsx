import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TelematicsApp from '../screen/Temperature';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SavedDataScreen from '../screen/SavedDataScreen';

const Tab = createBottomTabNavigator();

function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        header: () => null,
      })}>
      <Tab.Screen
        name="Home"
        component={TelematicsApp}
        options={{tabBarBadge: 3, tabBarLabel: 'Profile'}}
      />
      <Tab.Screen name="Settings" component={SavedDataScreen} />
    </Tab.Navigator>
  );
}

export default MainNavigation;
