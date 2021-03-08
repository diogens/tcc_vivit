import React from 'react'
import { Image, Animated, View, Dimensions, Text } from 'react-native'
import theme from '../../styles/theme'
/* import * as S from './styled' */

const { width, height } = Dimensions.get('window')

const imageW = width * 0.9
const imageH = imageW * 2

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200'
]
const data2 = [
  {
    title: 'Amor bandido',
    subtitle:
      'Amor bandido: polícia liberta amante de namorada do tráfico em Betim',
    post: 'balblablallbab!',
    url:
      'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1ekLkD.img?h=350&w=624&m=6&q=60&o=f&l=f',
    data: '10/10/2021'
  },
  {
    title: 'Title2',
    subtitle: 'Subtitle2',
    post: 'balblablallbab!',
    url:
      'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
    data: '10/10/2021'
  },
  {
    title: 'Title3',
    subtitle: 'Subtitle3',
    post: 'balblablallbab!',
    url:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    data: '10/10/2021'
  },
  {
    title: 'Title4',
    subtitle: 'Subtitle3',
    post: 'balblablallbab!',
    url:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    data: '10/10/2021'
  },
  {
    title: 'Title5',
    subtitle: 'Subtitle3',
    post: 'balblablallbab!',
    url:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    data: '10/10/2021'
  },
  {
    title: 'Title6',
    subtitle: 'Subtitle3',
    post: 'balblablallbab!',
    url:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    data: '10/10/2021'
  },
  {
    title: 'Title7',
    subtitle: 'Subtitle3',
    post: 'balblablallbab!',
    url:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    data: '10/10/2021'
  },
  {
    title: 'Title7',
    subtitle: 'Subtitle3',
    post: 'balblablallbab!',
    url:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    data: '10/10/2021'
  }
]

export const Home = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current
  const scrollX = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    console.log(scrollX, scrollY)
  }, [scrollX, scrollY])

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Animated.FlatList
        data={data2}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        ListHeaderComponent={
          <Animated.FlatList
            data={data2}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row',
              padding: 10
            }}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <Image
                  key={index}
                  source={{
                    uri: item.url
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    resizeMode: 'cover',
                    borderRadius: 16,
                    margin: 5
                  }}
                />
              )
            }}
          />
        }
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                paddingHorizontal: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.sandyBrown,
                margin: 10,
                borderRadius: 10
              }}
            >
              <Text
                style={{
                  paddingVertical: 20
                }}
              >
                {item.title}
              </Text>
              <Image
                source={{ uri: item.url }}
                style={{
                  width: imageW,
                  height: 300,
                  resizeMode: 'cover',
                  borderRadius: 16
                }}
              />
              <Text
                style={{
                  paddingVertical: 20
                }}
              >
                {item.subtitle}
              </Text>
            </View>
          )
        }}
      />
    </View>
  )
}
