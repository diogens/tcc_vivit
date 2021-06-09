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
  SafeAreaView
} from 'react-native'
const { width } = Dimensions.get('screen')
import { EvilIcons } from '@expo/vector-icons'
import {
  FlingGestureHandler,
  Directions,
  State
} from 'react-native-gesture-handler'

import { useQuery } from '@apollo/client'
import { QueryPosts } from 'graphql/generated/QueryPosts'
import { QUERY_POSTS } from '../../graphql/queries/posts'
import theme from '../../styles/theme'

const OVERFLOW_HEIGHT = 90
const SPACING = 10
const ITEM_WIDTH = width * 0.86
const ITEM_HEIGHT = ITEM_WIDTH * 1.5
const VISIBLE_ITEMS = 3

const OverflowItems = ({ data, scrollXAnimated }) => {
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
            <View key={index} style={styles.itemContainer}>
              <Text style={[styles.title]} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.itemContainerRow}>
                <Text style={[styles.location]}>
                  <EvilIcons
                    name="location"
                    size={16}
                    color="white"
                    style={{ marginRight: 5 }}
                  />
                  {item?.centro.name}
                </Text>
                <Text style={[styles.date]}>{item.date}</Text>
              </View>
            </View>
          )
        })}
      </Animated.View>
    </View>
  )
}

export default function App() {
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

  const { data, error, loading, fetchMore, refetch } = useQuery<QueryPosts>(
    QUERY_POSTS
  )

  async function loadPage(pageNumber = 2, shouldRefresh = false) {}

  async function refreshList() {
    refetch({
      query: QUERY_POSTS
    })
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

  return (
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
          <FlatList
            data={data?.posts}
            keyExtractor={(_, index) => String(index)}
            horizontal
            onRefresh={refreshList}
            refreshing={refreshing}
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center',
              padding: SPACING * 2,
              marginTop: 50
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
              const newStyle = [style, { zIndex: data.posts.length - index }]
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
                outputRange: [50, 0, -100]
              })
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 1.6]
              })
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [1 - 1 / VISIBLE_ITEMS, 1, 0]
              })

              return (
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: -ITEM_WIDTH / 2,
                    opacity,
                    transform: [
                      {
                        translateX
                      },
                      { scale }
                    ]
                  }}
                >
                  <Image
                    source={{ uri: `http://5.183.8.1:1337${item?.cover?.url}` }}
                    style={{
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                      borderRadius: 14
                    }}
                  />
                </Animated.View>
              )
            }}
          />
          <OverflowItems data={data} scrollXAnimated={scrollXAnimated} />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.theme_colors.back
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
