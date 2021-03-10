import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Feed } from '../../components'

import { User } from '../../context/UserContext'

import { api } from '../../services/api'

export const TimeLine = () => {
  const { setNewsId } = React.useContext(User)

  const [news, setNews] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [refreshing, setRefreshing] = React.useState(false)

  const navigation = useNavigation()

  React.useEffect(() => {
    setTimeout(() => {
      getNews()
    }, 2000)
  }, [])

  async function getNews() {
    try {
      const response = await api.get('/posts')
      console.log(response.data)
      setNews(response.data)
    } catch (error) {
      console.log('aqui')
      const { data, status } = error.response
      console.log('=>', data)
      console.log(status)
    }
  }

  async function refreshList() {
    setRefreshing(true)

    await getNews()
    setTimeout(() => {
      setRefreshing(false)
      setLoading(false) ///
    }, 200)
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <FlatList
        key="list"
        data={news}
        onRefresh={refreshList}
        refreshing={refreshing}
        keyExtractor={(item) => item.id}
        ListFooterComponent={loading && <Text>Carregand...</Text>}
        viewabilityConfig={{
          viewAreaCoveragePercentThreshold: 10
        }}
        renderItem={({ item }) => (
          <Feed
            onPress={() => {
              navigation.navigate('Post', { postId: item?._id })
              console.log(item?._id)
              setNewsId(item?._id)
            }}
            /* nameUser="Diogenes" */
            titleNews={item?.titulo}
            source={`http://5.183.8.1:1337${item.cover.formats.medium.url}`}
          />
        )}
      />
    </View>
  )
}
