import React from 'react'
import { Button, View } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import ButtomHemocentros from '../components/ButtomHemocentros'

import Feed from '../screens/Feed'
import Mapa from '../screens/Map'

import { AntDesign } from '@expo/vector-icons'

const TabNavigator = createBottomTabNavigator()

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
      <TabNavigator.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: '#000',
            borderTopColor: 'rgba(255, 255, 255, 0.3)'
          },
          activeTintColor: '#fff'
        }}
      >
        <TabNavigator.Screen
          name="Feed"
          component={Feed}
          options={{
            title: 'Noticias',
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ color }) => (
              <AntDesign name="notification" color={color} size={30} />
            )
          }}
        />
        <TabNavigator.Screen
          name="Vivit"
          component={Mapa}
          options={{
            title: '',
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ color }) => (
              <ButtomHemocentros color={color} size={50} />
            )
          }}
        />
        <TabNavigator.Screen
          name="Map"
          component={Feed}
          options={{
            title: 'Hemocentros',
            // eslint-disable-next-line react/display-name
            tabBarIcon: ({ color }) => (
              <AntDesign name="info" color={color} size={30} />
            )
          }}
        />
      </TabNavigator.Navigator>
    </NavigationContainer>
  )
}
