import 'react-native-gesture-handler'

import React from 'react'
import { StatusBar, ActivityIndicator } from 'react-native'
import { ThemeProvider } from 'styled-components/native'

import * as Updates from 'expo-updates'
import { useFonts } from 'expo-font'

import RoutersNavigation from './routers'
import { UserStorage } from './context/UserContext'
import theme from './styles/theme'
import { Layout } from './components'

export default function App() {
  let [fontsLoaded] = useFonts({
    'ubuntu-regular': require('../assets/fonts/Ubuntu/Ubuntu-Regular.ttf')
  })

  React.useEffect(() => {
    async function updateApp() {
      try {
        const update = await Updates.checkForUpdateAsync()

        if (update.isAvailable) {
          alert('Existe uma atualização :)')
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
    return <ActivityIndicator />
  } else {
    return (
      <ThemeProvider theme={theme}>
        <StatusBar
          backgroundColor={theme.colors.charcoal}
          barStyle="light-content"
        />
        <UserStorage>
          <Layout>
            <RoutersNavigation />
          </Layout>
        </UserStorage>
      </ThemeProvider>
    )
  }
}
