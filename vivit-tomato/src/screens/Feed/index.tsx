import React from 'react'
import { Button, View, Text, ActivityIndicator } from 'react-native'
import { ApolloProvider, useQuery, gql } from '@apollo/client'
import * as S from './styles'
import { FlatList } from 'react-native-gesture-handler'

import Post from '../../components/Post'
import { apolloClient } from '../../../apollo'

const GET_STARSHIP = gql`
  query listPosts {
    posts {
      id
      title
      subtitle
      date
      description
      cover {
        name
        url
      }
    }
  }
`

const Feed = ({ navigation }) => {
  /* const {} = apolloClient.query */
  const { data, error, loading } = useQuery(GET_STARSHIP)
  if (error) {
    console.log('Error fetching starship', error)
  }

  return (
    <S.Wrapper>
      <Text style={{ fontFamily: 'Ubuntu-Light' }}>Aqui</Text>

      {loading ? (
        <ActivityIndicator color="#333" />
      ) : (
        <View>
          <Text style={{ fontFamily: 'Ubuntu-Bold' }}>Agora</Text>
          <FlatList
            data={data.posts}
            renderItem={({ item, separators, index }) => {
              return <Post title={item.title} />
            }}
          />
        </View>
      )}
    </S.Wrapper>
  )
}

export default Feed
