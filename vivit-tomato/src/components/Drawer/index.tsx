import React from 'react'
import * as S from './styles'
import { Button, DrawerLayoutAndroid, StyleSheet, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { Avatar } from 'react-native-elements'

import Text from '../Text'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { User } from '../../context/UserContext'
import theme from '../../styles/theme'

type DrawerProps = {
  children: React.ReactChild
  nameScreen: string
}

const Drawer = ({ children, nameScreen }: DrawerProps) => {
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
          <AntDesign
            name="menufold"
            color={theme.theme_colors.white}
            size={20}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}
      >
        <Avatar
          activeOpacity={0.2}
          avatarStyle={{}}
          containerStyle={{ backgroundColor: '#BDBDBD' }}
          icon={{}}
          iconStyle={{}}
          imageProps={{}}
          onLongPress={() => alert('onLongPress')}
          onPress={() => alert('onPress')}
          overlayContainerStyle={{}}
          placeholderStyle={{}}
          rounded
          size="xlarge"
          source={{
            uri: 'https://images.virgula.com.br/2017/04/PicMonkey-Collage38.jpg'
          }}
          title="P"
          titleStyle={{}}
        />
        <Text
          text={`Bem Vindo! ${user?.user?.username}`}
          color="white"
          size="xxlarge"
        />
      </View>
      <TouchableOpacity
        style={{
          borderColor: theme.theme_colors.primary,
          borderWidth: 2,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
          borderRadius: 10
        }}
        onPress={() => {
          signOut()
          drawer.current.closeDrawer()
        }}
      >
        <Text text="LogOff" fontFamily="ubuntu" color="white" />
      </TouchableOpacity>
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
          paddingHorizontal: 10,
          paddingBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            drawer.current.openDrawer()
          }}
        >
          <AntDesign name="menu-fold" color="#FFF" size={20} />
        </TouchableOpacity>

        <Text
          text={nameScreen}
          color="white"
          fontFamily="ubuntu"
          size="xlarge"
        />

        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            message({
              title: 'Relatar Problemas',
              message: 'Relate aqui os problemas ou duvidas ....',
              textBtn: 'OK',
              action: () => console.log('fechando...')
            })
          }}
        >
          <AntDesign name="Safety" color="#FFF" size={20} />
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
