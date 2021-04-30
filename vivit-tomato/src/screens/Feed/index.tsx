import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Details from './details'
import Feeds from './feed'

const Stack = createStackNavigator()

function Feed() {
  return (
    <Stack.Navigator initialRouteName="Feeds" headerMode="none">
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Awesome app'
        }}
      />
      <Stack.Screen
        name="Feeds"
        component={Feeds}
        options={{
          title: 'Awesome app'
        }}
      />
    </Stack.Navigator>
  )
}

export default Feed
