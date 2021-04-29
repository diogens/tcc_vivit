import React from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  Animated,
  Image,
  SafeAreaView
} from 'react-native'

import { useQuery } from '@apollo/client'
import * as S from './styles'

import { QueryPosts } from 'graphql/generated/QueryPosts'
import { QUERY_POSTS } from '../../graphql/queries/posts'
import { StatusBar } from 'react-native'

import {
  Directions,
  FlingGestureHandler,
  State,
  TouchableOpacity
} from 'react-native-gesture-handler'

const Feed = ({ navigation }) => {
  const IMAGE_WIDTH = 400 * 0.86
  const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5
  const VISIBLE_ITEMS = 1

  const { data, error, loading } = useQuery<QueryPosts>(QUERY_POSTS)

  if (error) {
    console.log('Error fetching posts', error)
  }

  const [activeIndex, setActiveIndex] = React.useState(0)
  const animatedValue = React.useRef(new Animated.Value(0)).current
  const reactiveAnimated = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: reactiveAnimated,
      duration: 300,

      useNativeDriver: true
    }).start()
  }, [])

  const setActiveSlide = React.useCallback((newIndex) => {
    setActiveIndex(newIndex)
    reactiveAnimated.setValue(newIndex)
  })

  return (
    <FlingGestureHandler
      key="UP"
      direction={Directions.UP}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.END) {
          // incremente index
          if (activeIndex === data.posts.length - 1) {
            return
          }
          setActiveSlide(activeIndex + 1)
          /* console.log('=>', activeIndex + 1) */
        }
      }}
    >
      <FlingGestureHandler
        key="DOWN"
        direction={Directions.DOWN}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.END) {
            // incremente index
            if (activeIndex === 0) {
              return
            }
            setActiveSlide(activeIndex - 1)
            /*  console.log(activeIndex - 1) */
          }
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
          <StatusBar hidden />
          {loading ? (
            <ActivityIndicator color="#333" />
          ) : (
            <View style={{ flex: 1 }}>
              <Animated.FlatList
                data={data.posts}
                scrollEnabled={false}
                horizontal
                inverted
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                CellRendererComponent={({
                  index,
                  item,
                  children,
                  style,
                  ...props
                }) => {
                  const newStyles = [
                    style,
                    {
                      zIndex: data.posts.length + index,
                      left: -IMAGE_WIDTH / 2,
                      top: -IMAGE_HEIGHT / 2
                    }
                  ]
                  return (
                    <View key={index} {...props} style={newStyles}>
                      {children}
                    </View>
                  )
                }}
                renderItem={({ item, index }) => {
                  const inputRange = [index - 1, index, index + 1]
                  console.log('=>', inputRange)
                  const translateY = animatedValue.interpolate({
                    inputRange,
                    outputRange: [-40, 0, 30]
                  })
                  const opacity = animatedValue.interpolate({
                    inputRange,
                    outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0]
                  })
                  const scale = animatedValue.interpolate({
                    inputRange,
                    outputRange: [0.92, 1, 1.3]
                  })

                  return (
                    <Animated.View
                      style={{
                        position: 'absolute',
                        opacity,
                        transform: [{ translateY }, { scale }]
                      }}
                    >
                      <TouchableOpacity onPress={() => {}}>
                        <Image
                          source={{
                            uri: `http://5.183.8.1:1337${item?.cover?.url}`
                          }}
                          style={{
                            width: IMAGE_WIDTH,
                            height: IMAGE_HEIGHT,
                            borderRadius: 20,
                            resizeMode: 'cover'
                          }}
                        />
                        <View style={{ position: 'absolute', bottom: 20 }}>
                          <Text
                            style={{
                              textTransform: 'uppercase',
                              fontSize: 36,
                              fontWeight: 'bold',
                              color: '#fff',
                              left: 30
                            }}
                          >
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </Animated.View>
                  )
                }}
              />
            </View>
          )}
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  )
}

export default Feed
