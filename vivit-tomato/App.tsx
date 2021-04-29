import React from 'react'
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import { StatusBar } from 'react-native'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'styled-components/native'
import * as Updates from 'expo-updates'

import Routers from './src/router'

import { apolloClient } from './apollo'
import theme from './src/styles/theme'

export default function App() {
  const [fontsLoaded] = Font.useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
    'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
    'Ubuntu-BoldItalic': require('./assets/fonts/Ubuntu-BoldItalic.ttf'),
    'Ubuntu-Light': require('./assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu-Medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
    'Inter-SemiBoldItalic':
      'https://rsms.me/inter/font-files/Inter-SemiBoldItalic.otf?v=3.12'
  })

  React.useEffect(() => {
    async function updateApp() {
      try {
        const update = await Updates.checkForUpdateAsync()

        if (update.isAvailable) {
          alert('Existe uma atualização :) hehehe')
          await Updates.fetchUpdateAsync()
          await Updates.reloadAsync
        }
      } catch (error) {
        return false
      }
    }

    updateApp()
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <ApolloProvider client={apolloClient}>
      <StatusBar
        backgroundColor="#000"
        showHideTransition="slide"
        barStyle="light-content"
      />
      <ThemeProvider theme={theme}>
        <Routers />
      </ThemeProvider>
    </ApolloProvider>
  )
}
