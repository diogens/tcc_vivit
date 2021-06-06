import React from 'react'
import * as S from './styles'
import { View, Image, useWindowDimensions, Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SharedElement } from 'react-navigation-shared-element'
import { FontAwesome } from '@expo/vector-icons'
import HTML from 'react-native-render-html'
import { useQuery } from '@apollo/client'
import { QUERY_POSTS_BY_ID } from '../../graphql/queries/posts'
import {
  QueryPostById,
  QueryPostByIdVariables
} from '../../graphql/generated/QueryPostById'

import Text from '../../components/Text'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import theme from '../../styles/theme'

const IMAGE_WIDTH = Dimensions.get('window').width
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.2

const Details = ({ navigation, route }) => {
  const contentWidth = useWindowDimensions().width

  const { data, error, loading } = useQuery<
    QueryPostById,
    QueryPostByIdVariables
  >(QUERY_POSTS_BY_ID, {
    variables: { id: route.params.item }
  })
  /* const item = navigation.params */
  console.log(route.params.item)
  return (
    <>
      <TouchableOpacity
        style={{
          elevation: 3,
          top: 25,
          zIndex: 22,
          left: 30
        }}
        onPress={() => navigation.navigate('Feeds')}
      >
        <View
          style={{
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <FontAwesome
            name="arrow-circle-o-left"
            size={50}
            color={theme.theme_colors.tomato}
          />
        </View>
      </TouchableOpacity>
      <S.WrapperDetails>
        {loading ? (
          <Text
            color="white"
            size="large"
            fontFamily="ubuntu"
            text="Carregando..."
          />
        ) : error ? (
          <Text
            color="white"
            size="large"
            fontFamily="ubuntu"
            text="Error 400..."
          />
        ) : (
          <>
            <SharedElement id={`item.${route.params.item}.photo`}>
              <Image
                source={{
                  uri: `http://5.183.8.1:1337${data.posts[0].cover.url}`
                }}
                style={{
                  width: IMAGE_WIDTH,
                  height: IMAGE_HEIGHT,
                  borderRadius: 20,
                  resizeMode: 'cover'
                }}
              />
            </SharedElement>

            <View>
              <Text
                color="white"
                size="large"
                fontFamily="ubuntu"
                text={data.posts[0].title}
              />

              <View>
                <Text
                  size="large"
                  fontFamily="ubuntu"
                  text={data.posts[0].subtitle}
                />
                <Text
                  size="medium"
                  fontFamily="ubuntu"
                  text={data.posts[0].date}
                />

                <HTML
                  classesStyles={{}}
                  source={{ html: data.posts[0].description }}
                  contentWidth={contentWidth}
                />
                <View style={{ height: 100 }} />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                console.log('aqui')
              }}
            ></TouchableOpacity>
          </>
        )}
      </S.WrapperDetails>
    </>
  )
}

Details.sharedElements = (
  navigation: ReturnType<typeof useNavigation>,
  router: ReturnType<typeof useRoute>
) => {
  const item = navigation.params.item
  /*  console.log('=>', navigation.params.item) */
  /* console.log(item) */
  return [`item.${item}.photo`]
}

export default Details