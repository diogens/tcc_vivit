import React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import ButtomHemocentros from '../components/ButtomHemocentros'

import Feed from '../screens/Feed'
import Mapa from '../screens/Map'

import {AntDesign} from '@expo/vector-icons'

const Drawer = createDrawerNavigator();
const TabNavigator = createBottomTabNavigator();


/* const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Vivit" component={Feed} />
      <Drawer.Screen name="Mapa" component={Mapa} />
    </Drawer.Navigator>
  );
} */

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator.Navigator tabBarOptions={{
        style: {
          backgroundColor: '#000',
          borderTopColor: 'rgba(255, 255, 255, 0.3)'
        },
        activeTintColor: '#fff',
      }} >
        <TabNavigator.Screen name="Feed" component={Feed} options={{title: 'Noticias', tabBarIcon: ({color, focused}) =>  <AntDesign name="notification" color={color} size={30} /> }}/>
        <TabNavigator.Screen name="Vivit" component={Feed} options={{title: '', tabBarIcon: ({color, focused}) =>  <ButtomHemocentros color={color} size={50} />}}/>
        <TabNavigator.Screen name="Map" component={Mapa} options={{title: 'Hemocentros', tabBarIcon: ({color, focused}) =>  <AntDesign name="info" color={color} size={30} />}}/>
      </TabNavigator.Navigator>
     
    </NavigationContainer>
  );
}