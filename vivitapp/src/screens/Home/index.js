import React from 'react'
import { Image, Animated, View, Dimensions, Text } from 'react-native'
import theme from '../../styles/theme'
/* import * as S from './styled' */

const { width, height } = Dimensions.get('window')

const imageW = width * 0.7
const imageH = imageW * 2

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200'
]

export const Home = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current
  const scrollY = React.useRef(new Animated.Value(0)).current

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        keyExtractor={(_, index) => index.toString()}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width,
                height,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.charcoal
              }}
            >
              <Text>data: 10/10/2021 - 12:32hs </Text>
              <Text>Titulo..</Text>
              <Image
                source={{ uri: item }}
                style={{
                  width: imageW,
                  height: imageH,
                  resizeMode: 'cover',
                  borderRadius: 16
                }}
              />
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
                vitae? Quibusdam odit, accusantium earum quo quia cum est
                pariatur exercitationem, aperiam magnam veniam. Quas vitae
                consequatur in minus molestiae unde.
              </Text>
            </View>
          )
        }}
      />
    </View>
  )
}
