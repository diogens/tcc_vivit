import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, ScrollView, Image } from 'react-native'
import { Text } from 'react-native-paper'
/* import HTML from 'react-native-render-html' */

import { User } from '../../context/UserContext'

import { api } from '../../services/api'

export const Post = ({ navigation, route }) => {
  const [galeria, setGaleria] = React.useState([
    {
      source: {
        uri: ''
      },
      width: 806,
      height: 720
    }
  ])
  const [images, setImages] = React.useState([
    {
      uri:
        'https://storage.googleapis.com/votorantim-images/news-images/17dfcee7-e992-4291-a102-861473207d7a-fernando-de-noronha.jpg'
    },
    {
      uri:
        'https://cdn.pixabay.com/photo/2017/05/19/07/34/teacup-2325722__340.jpg'
    }
  ])
  const [news, setNews] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    async function getNews() {
      try {
        const response = await api.get(`/posts/${route.params.postId}`)

        setNews(response.data)
        /* setImages(response.data.fotos) */
        /* const image = response.data.fotos.map((img) => {
          return { source: { ...img }, height: 820 }
        }) */
        console.log('=>2', route.params.postId)
        /* setNews(response.data) */
        setLoading(false)
      } catch (error) {
        const { data } = error.response
        console.log(data)
      } finally {
        setTimeout(() => {
          setLoading(true)
        }, 2000)
      }
    }
    getNews()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          zIndex: -1,
          /* borderRadius: theme.border.radius.replace('px', ''), */
          borderTopStartRadius: 30,
          borderTopEndRadius: 30,
          borderWidth: 1,
          overflow: 'hidden',
          borderColor: '#fff',
          marginTop: -15
          /* borderColor: 'red',
          alignItems: 'center',
          justifyContent: 'center' */
        }}
      >
        {loading ? (
          <ScrollView>
            {/* <ImageView
              onClose={() => setVisible(false)}
              images={galeria}
              imageIndex={0}
              isVisible={visible}
              renderFooter={(currentImage) => (
                <View>
                  <Text>My footer</Text>
                </View>
              )}
            /> */}
            <View style={{ paddingHorizontal: 30, flex: 1 }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  borderLeftColor: 'green',
                  borderLeftWidth: 10,
                  paddingLeft: 20
                }}
              >
                {news?.title}
              </Text>
              <Image
                style={{ width: '100%', height: 200 }}
                source={{
                  uri: `http://5.183.8.1:1337${news?.cover?.formats?.medium?.url}`
                }}
              />
              {/* <HTML html={news.texto} /> */}
            </View>
          </ScrollView>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-around',
              opacity: 0.7
            }}
          >
            <Text>Carregando .......</Text>
          </View>
        )}
      </View>
    </View>
  )
}
