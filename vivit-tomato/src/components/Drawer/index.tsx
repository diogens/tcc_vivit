import React from 'react'
import * as S from './styles'
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View
} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { User } from '../../context/UserContext'

type DrawerProps = {
  children: React.ReactChild
}

const Drawer = ({ children }: DrawerProps) => {
  const { message, signOut } = React.useContext(User)

  const drawer = React.useRef(null)

  const navigationView = () => (
    <View style={styles.container}>
      <View style={{ backgroundColor: 'red' }}>
        <Text>Welcome Sr Diogenes</Text>
        <Text style={styles.paragraph}>I'm in the Drawer!</Text>
        <Button
          title="Close drawer"
          onPress={() => drawer.current.closeDrawer()}
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
    >
      <Button
        title="Drawer - colocar em modo float"
        onPress={() => {
          drawer.current.openDrawer()
        }}
      />
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
