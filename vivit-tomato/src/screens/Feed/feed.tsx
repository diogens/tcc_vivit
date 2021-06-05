import React from 'react'
import {
  View,
  ActivityIndicator,
  Animated,
  Image,
  SafeAreaView,
  Dimensions
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

import Text from '../../components/Text'

import { SharedElement } from 'react-navigation-shared-element'
import { useNavigation, useRoute } from '@react-navigation/native'

const Feeds = ({ navigation }) => {
  const IMAGE_WIDTH = Dimensions.get('window').width * 0.86
  const IMAGE_HEIGHT = IMAGE_WIDTH * 1.5
  const VISIBLE_ITEMS = 4

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
  }, [reactiveAnimated, animatedValue])

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
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff" />
          {loading ? (
            <ActivityIndicator color="#333" />
          ) : (
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
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Details', { item: item.id })
                      }}
                    >
                      <SharedElement id={`item.${item.id}.photo`}>
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
                      </SharedElement>

                      <View style={{ position: 'absolute', bottom: 20 }}>
                        <Text
                          size="xxxlarge"
                          text={item.title}
                          uppercase={true}
                        />
                      </View>
                    </TouchableOpacity>
                  </Animated.View>
                )
              }}
            />
          )}
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  )
}

export default Feeds
