import React from 'react'
import * as S from './styles'
import { View, Text, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SharedElement } from 'react-native-shared-element'

const IMAGE_WIDTH = 400 * 0.86
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5
const VISIBLE_ITEMS = 1

const styles = StyleSheet.create({})

const Height = () => {
  return (
    <View>
      <Text>title</Text>
      <View>
        <Text>informações babllal</Text>
        <Text>1231</Text>
        <Text>m</Text>
      </View>
    </View>
  )
}

const Distance = () => {
  return (
    <View>
      <Text>Distance</Text>
      <View>
        <Text>{Math.floor(Math.random() * 40) + 20}</Text>
        <Text>km</Text>
      </View>
    </View>
  )
}

const Details = ({ navigation }) => (
  <S.Wrapper>
    <SharedElement id="image">
      <Image
        source={{
          uri: `http://5.183.8.1:1337/uploads/download_3_852f9fdb84.jpg`
        }}
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_HEIGHT,
          borderRadius: 20,
          resizeMode: 'cover'
        }}
      />
    </SharedElement>
    <Height />
    <Distance />
    <TouchableOpacity
      onPress={() => {
        console.log('aqui')
      }}
    >
      <Text>FEED</Text>
    </TouchableOpacity>
  </S.Wrapper>
)

Details.sharedElements = (route, otherRoute, showing) => [
  { id: 'image' },
  { id: 'text', animation: 'fade' }
]

export default Details
