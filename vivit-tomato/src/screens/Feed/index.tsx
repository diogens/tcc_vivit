import React from 'react'

import Details from './details'
import Feeds from './feed'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'
import { Easing } from 'react-native-reanimated'
import { CardStyleInterpolators } from '@react-navigation/stack'

type SharedStackParams = {
  List: undefined
  Details: {
    id: number
    src: string
  }
}

const {
  Navigator,
  Screen
} = createSharedElementStackNavigator<SharedStackParams>()

function Feed() {
  return (
    <Navigator initialRouteName="Feeds" headerMode="none">
      <Screen
        name="Details"
        /* sharedElementsConfig={({ name, key, params }) => {
          return [
            {
              id: key,
              animation: 'fade-in',
              resize: 'clip'
            }
          ]
        }} */
        component={Details}
        options={{
          gestureEnabled: false,
          headerBackTitleVisible: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: { duration: 400 }
            },
            close: {
              animation: 'timing',
              config: { duration: 400 }
            }
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress
              }
            }
          }
        }}
        initialParams={{ id: 0, src: 'unknow' }}
        sharedElements={(route, otherRoute, showing) => {
          const { item } = route.params
          return [
            {
              id: `item.${item.id}.photo`,
              animation: 'fade'
              // resize: 'clip'
              // align: ''left-top'
            }
          ]
        }}
      />
      <Screen
        name="Feeds"
        component={Feeds}
        options={{
          gestureEnabled: false,
          headerBackTitleVisible: false,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: { duration: 400 }
            },
            close: {
              animation: 'timing',
              config: { duration: 400 }
            }
          },
          cardStyleInterpolator: ({ current: { progress } }) => {
            return {
              cardStyle: {
                opacity: progress
              }
            }
          }
        }}
      />
    </Navigator>
  )
}

export default Feed
