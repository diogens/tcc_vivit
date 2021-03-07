/* eslint-disable react/display-name */
import React from 'react'
import {
  createDrawerNavigator
  /* DrawerItemList,
  DrawerItem,
  DrawerContentScrollView */
} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// Icons
// components

// screens
import { Home, Map } from '../screens'

import theme from '../styles/theme'
import { User } from '../context/UserContext'

/* function MainProfileDrawerContent({ navigation, ...props }) {
  const { userLogOut } = React.useContext(User)

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        activeTintColor="#F6C117"
        icon={({ size, focused, color }) => (
          <Icon name="email" size={size} color="#F6C117" />
        )}
        labelStyle={{ color: '#fff' }}
        options={{
          drawerIcon: ({ color, focused, size }) => {
            return <Icon name="email" size={size} color="#F6C117" />
          }
        }}
        label="Meu Perfil2"
        onPress={() => {
          console.log('Props =>')
          navigation.navigate('Perfil')
        }}
      />

      <DrawerItem
        activeTintColor="#F6C117"
        icon={({ size, focused, color }) => (
          <Icon name="email" size={size} color="#F6C117" />
        )}
        label="Sair"
        labelStyle={{ color: '#fff' }}
        onPress={() => {
          userLogOut()
          alert('Saindo')
        }}
      />
    </DrawerContentScrollView>
  )
} */

const Drawer = createDrawerNavigator()
export default function Routes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerStyle={{
          width: '90%',
          borderTopRightRadius: 40,
          borderBottomRightRadius: 40,
          backgroundColor: theme.colors.primary
        }}
        drawerContentOptions={{
          margin: -0,
          activeBackgroundColor: theme.colors.lightBlue,
          labelStyle: { color: '#fff' },
          itemStyle: { width: '100%', height: 70, justifyContent: 'center' },
          activeTintColor: '#F6C117',
          inactiveTintColor: '#F6C117'
          /* contentContainerStyle: { backgroundColor: 'green' } */
        }}
        /* drawerContent={(props) => <MainProfileDrawerContent {...props} />} */
      >
        <Drawer.Screen
          options={{
            drawerIcon: ({ color, focused, size }) => (
              <Icon name="email" color={color} size={size} />
            )
          }}
          name="Home"
          component={Home}
        />
        <Drawer.Screen
          options={{
            drawerIcon: ({ color, focused, size }) => (
              <Icon name="email" color={color} size={size} />
            )
          }}
          name="Map"
          component={Map}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
