import React from 'react'
import { useColorScheme } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  createStackNavigator,
  StackNavigationProp
} from '@react-navigation/stack'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  NavigatorScreenParams
} from '@react-navigation/native'

import ButtomHemocentros from '../components/ButtomHemocentros'

import Feed from '../screens/Feed'
import Mapa from '../screens/Map'
import Agendamento from '../screens/Agendamento'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'

import Drawer from '../components/Drawer'

import { AntDesign } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { StackParams } from './types'
import { User } from '../context/UserContext'

export type PropsNavigate = {
  navigation: StackNavigationProp<StackParams>
}

const TabNavigator = createBottomTabNavigator()
const Stack = createStackNavigator()

/* const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Vivit" component={Feed} />
      <Drawer.Screen name="Mapa" component={Mapa} />
    </Drawer.Navigator>
  );
} */
function Auth() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  )
}
function ScreensApp() {
  return (
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
            <Entypo name="news" color={color} size={30} />
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
        name="Agendamentos"
        component={Agendamento}
        options={{
          title: 'Agendamentos',
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ color }) => (
            <FontAwesome name="calendar" size={30} color={color} />
          )
        }}
      />
    </TabNavigator.Navigator>
  )
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)'
  }
}

export default function App() {
  const scheme = useColorScheme()
  const { authenticated, theme } = React.useContext(User)

  console.log()

  return (
    <NavigationContainer theme={theme ? DarkTheme : DefaultTheme}>
      {!authenticated.authenticated ? <Auth /> : <ScreensApp />}
    </NavigationContainer>
  )
}
