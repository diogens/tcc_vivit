import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack'

import { SignIn, SignUp } from '../screens'

const Auth = createStackNavigator()

function AuthRoute() {
  return (
    <NavigationContainer>
      <Auth.Navigator
        initialRouteName="SignIn"
        headerMode="none"
        screenOptions={{
          headerShown: false,
          gestureDirection: 'horizontal',
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec
          },
          cardStyleInterpolator: ({ current, next, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0]
                    })
                  },
                  /* {
                    rotate: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    }),
                  }, */
                  {
                    scale: next
                      ? next.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0.9]
                        })
                      : 1
                  }
                ]
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5]
                })
              }
            }
          }
          /* ...TransitionPresets.ScaleFromCenterAndroid    */
        }}
      >
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="SignUp" component={SignUp} />
      </Auth.Navigator>
    </NavigationContainer>
  )
}

export default AuthRoute
