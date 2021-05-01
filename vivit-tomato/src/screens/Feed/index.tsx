import React from 'react'

import Details from './details'
import Feeds from './feed'
import { createSharedElementStackNavigator } from 'react-navigation-shared-element'

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
        component={Details}
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
        component={Feeds}
        options={{
          title: 'Awesome app'
        }}
      />
    </Navigator>
  )
}

export default Feed
