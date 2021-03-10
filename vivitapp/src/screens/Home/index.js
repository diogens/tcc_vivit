import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TimeLine } from './timeLine'
import { Post } from './post'

const Feed = createStackNavigator()

export const Home = () => {
  return (
    <Feed.Navigator
      headerMode="none"
      screenOptions={{
        headerShown: false
      }}
    >
      <Feed.Screen name="Feed" component={TimeLine} />
      <Feed.Screen name="Post" component={Post} />
    </Feed.Navigator>
  )
}
