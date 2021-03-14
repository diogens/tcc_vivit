/* eslint-disable react/display-name */
import React from 'react'
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
  DrawerContentScrollView
} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import { SimpleLineIcons } from '@expo/vector-icons'
// Icons
// components

// screens
import { Home, Map } from '../screens'

import theme from '../styles/theme'
import { User } from '../context/UserContext'

function MainProfileDrawerContent({ navigation, ...props }) {
  const { userLogOut } = React.useContext(User)

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        activeTintColor="#F6C117"
        icon={({ size, focused, color }) => (
          <SimpleLineIcons name="event" size={size} color="#F6C117" />
        )}
        labelStyle={{ color: '#fff' }}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            return <SimpleLineIcons name="event" size={size} color="#F6C117" />
          }
        }}
        label="Eventos"
        onPress={() => {
          console.log('Evento... =>')
        }}
      />

      <DrawerItem
        activeTintColor="#F6C117"
        icon={({ size, focused, color }) => (
          <SimpleLineIcons name="login" size={size} color="#F6C117" />
        )}
        label="Entrar"
        labelStyle={{ color: '#fff' }}
        onPress={() => {
          userLogOut()
          alert('Entrando')
        }}
      />
    </DrawerContentScrollView>
  )
}

const Drawer = createDrawerNavigator()
export default function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          width: '80%',
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          backgroundColor: theme.colors.charcoal
        }}
        drawerContentOptions={{
          margin: -0,
          activeBackgroundColor: theme.colors.BurntSienna,
          labelStyle: { color: '#fff' },
          itemStyle: {
            height: 70,
            justifyContent: 'center',
            borderRadius: 17
          },
          activeTintColor: theme.colors.charcoal,
          inactiveTintColor: theme.colors.BurntSienna
        }}
        /*  drawerContent={(props) => <MainProfileDrawerContent {...props} />} */
      >
        <Drawer.Screen
          options={{
            drawerIcon: ({ color, focused, size }) => (
              <SimpleLineIcons name="home" size={size} color={color} />
            )
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({ color, focused, size }) => (
              <SimpleLineIcons name="location-pin" size={size} color={color} />
            )
          }}
          name="Map"
          component={Map}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
