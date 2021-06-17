import React from 'react'
import * as S from './styles'
import { Button, DrawerLayoutAndroid, StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Text from '../Text'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { User } from '../../context/UserContext'
import theme from '../../styles/theme'

type DrawerProps = {
  children: React.ReactChild
}

const Drawer = ({ children }: DrawerProps) => {
  const { message, signOut, user } = React.useContext(User)

  const drawer = React.useRef(null)

  const navigationView = () => (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'flex-end'
        }}
      >
        <TouchableOpacity
          style={{ width: 40, height: 40 }}
          onPress={() => drawer.current.closeDrawer()}
        >
          <AntDesign name="menufold" color="#FFF" size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <Text
          text={`Bem Vindo! ${user.user.username}`}
          color="white"
          size="xxlarge"
        />
      </View>
      <Button
        title="LogOff"
        onPress={() => {
          signOut()
          drawer.current.closeDrawer()
        }}
      />
    </View>
  )

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={navigationView}
      drawerBackgroundColor="rgba(0,0,0,0.5)"
      style={{
        zIndex: 20
      }}
    >
      <View
        style={{
          backgroundColor: theme.theme_colors.back,
          paddingTop: 20,
          paddingBottom: 10
        }}
      >
        <TouchableOpacity
          style={{
            marginLeft: 30,
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            drawer.current.openDrawer()
          }}
        >
          <AntDesign name="menufold" color="#FFF" size={20} />
        </TouchableOpacity>
      </View>
      {children}
    </DrawerLayoutAndroid>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center'
  }
})

export default Drawer
