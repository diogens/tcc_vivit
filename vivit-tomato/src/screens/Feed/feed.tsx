import * as React from 'react'
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
const { width } = Dimensions.get('screen')
import { EvilIcons } from '@expo/vector-icons'
import {
  FlingGestureHandler,
  Directions,
  State
} from 'react-native-gesture-handler'

import moment from 'moment'

import { SharedElement } from 'react-navigation-shared-element'

import { useQuery, NetworkStatus } from '@apollo/client'
import { QueryPosts } from 'graphql/generated/QueryPosts'
import { QUERY_POSTS } from '../../graphql/queries/posts'
import theme from '../../styles/theme'
import { NavigationProp } from '@react-navigation/native'
import { PropsNavigate } from 'router'
import Drawer from '../../components/Drawer'

const OVERFLOW_HEIGHT = 90
const SPACING = 10
const ITEM_WIDTH = width * 0.86
const ITEM_HEIGHT = ITEM_WIDTH * 1.5
const VISIBLE_ITEMS = 5

const OverflowItems = ({ data, scrollXAnimated, navigation }) => {
  const inputRange = [-1, 0, 1]
  const translateY = scrollXAnimated.interpolate({
    inputRange,
    outputRange: [OVERFLOW_HEIGHT, 0, -OVERFLOW_HEIGHT]
  })
  return (
    <View style={styles.overflowContainer}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {data?.posts.map((item, index) => {
          return (
            <TouchableOpacity
              style={{}}
              key={index}
              onPress={() => navigation?.navigate('Details', { item: item.id })}
            >
              <View style={styles.itemContainer}>
                <Text style={[styles.title]} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.itemContainerRow}>
                  <Text style={[styles.location]} numberOfLines={1}>
                    <EvilIcons
                      name="location"
                      size={16}
                      color="white"
                      style={{ marginRight: 5 }}
                    />
                    {item?.centro.name}
                  </Text>
                  <Text style={[styles.date]} numberOfLines={1}>
                    {moment(item?.date).format('LLLL')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </Animated.View>
    </View>
  )
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity)

const Feeds = ({ navigation }: PropsNavigate) => {
  /* const [data, setData] = React.useState(DATA) */
  const scrollXIndex = React.useRef(new Animated.Value(0)).current
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current

  const [index, setIndex] = React.useState(0)
  const [refreshing, setRefreshing] = React.useState(false)
  const [total, setTotal] = React.useState(0)

  const setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex)
    setIndex(activeIndex)
  })

  const {
    data,
    error,
    loading,
    fetchMore,
    refetch,
    networkStatus
  } = useQuery<QueryPosts>(QUERY_POSTS, {
    notifyOnNetworkStatusChange: true
  })

  async function loadPage(pageNumber = 2, shouldRefresh = false) {}

  async function refreshList() {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  React.useEffect(() => {
    loadPage()
  }, [])

  React.useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true
    }).start()
  })

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          backgroundColor: theme.theme_colors.back
        }}
      >
        <ActivityIndicator color={theme.theme_colors.primary} size={300} />
      </View>
    )
  }

  if (error) {
    return <Text>Error {error.message}</Text>
  }

  return (
    <Drawer nameScreen="Saúde">
      <FlingGestureHandler
        key="left"
        direction={Directions.LEFT}
        onHandlerStateChange={(ev) => {
          if (ev.nativeEvent.state === State.END) {
            if (index === data?.posts.length - 1) {
              return
            }
            setActiveIndex(index + 1)
          }
        }}
      >
        <FlingGestureHandler
          key="right"
          direction={Directions.RIGHT}
          onHandlerStateChange={(ev) => {
            if (ev.nativeEvent.state === State.END) {
              if (index === 0) {
                return
              }
              setActiveIndex(index - 1)
            }
          }}
        >
          <SafeAreaView style={styles.container}>
            <Animated.FlatList
              data={data?.posts}
              keyExtractor={(_, index) => String(index)}
              horizontal
              onRefresh={refreshList}
              refreshing={refreshing}
              contentContainerStyle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              scrollEnabled={false}
              removeClippedSubviews={false}
              CellRendererComponent={({
                item,
                index,
                children,
                style,
                ...props
              }) => {
                const newStyle = [
                  style,
                  {
                    zIndex: data.posts.length - index,
                    letf: -ITEM_WIDTH / 2,
                    top: -ITEM_HEIGHT / 2
                  }
                ]
                return (
                  <View style={newStyle} index={index} {...props}>
                    {children}
                  </View>
                )
              }}
              renderItem={({ item, index }) => {
                const inputRange = [index - 1, index, index + 1]
                const translateX = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [50, 0, -20]
                })
                const scale = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [0.85, 1, 1.3]
                })
                const opacity = scrollXAnimated.interpolate({
                  inputRange,
                  outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0]
                })

                return (
                  <Animated.View
                    style={{
                      left: -ITEM_WIDTH / 2,
                      position: 'absolute',
                      opacity,
                      transform: [{ translateX }, { scale }]
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
                            width: ITEM_WIDTH,
                            height: ITEM_HEIGHT,
                            borderRadius: 20,
                            resizeMode: 'cover'
                          }}
                        />
                      </SharedElement>
                    </TouchableOpacity>
                  </Animated.View>
                )
              }}
            />
            <OverflowItems
              data={data}
              scrollXAnimated={scrollXAnimated}
              navigation={navigation}
            />
          </SafeAreaView>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </Drawer>
  )
}

export default Feeds

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
    fontFamily: theme.font.family.ubuntu_bold,
    color: theme.theme_colors.white
  },
  location: {
    fontSize: 16,
    color: theme.theme_colors.white
  },
  date: {
    fontSize: 12,
    color: theme.theme_colors.white
  },
  itemContainer: {
    height: OVERFLOW_HEIGHT,
    padding: SPACING * 2
  },
  itemContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  overflowContainer: {
    marginBottom: 20,
    height: OVERFLOW_HEIGHT,
    overflow: 'hidden'
  }
})
