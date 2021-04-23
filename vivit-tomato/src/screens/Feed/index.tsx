import React from 'react'
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import Post from '../../components/Post'
import { useQuery, gql } from '@apollo/client'
import * as S from './styles'

import { QueryPosts } from 'graphql/generated/QueryPosts'
import { QUERY_POSTS } from '../../graphql/queries/posts'

const Feed = ({ navigation }) => {
  /* const {} = apolloClient.query */
  const { data, error, loading } = useQuery<QueryPosts>(QUERY_POSTS)
  if (error) {
    console.log('Error fetching starship', error, data.posts)
  }

  return (
    <S.Wrapper>
      {loading ? (
        <ActivityIndicator color="#333" />
      ) : (
        <View>
          <FlatList
            data={data.posts}
            renderItem={({ item, separators, index }) => {
              return (
                <Post
                  key={index}
                  user={item?.centro?.name}
                  avatar={`http://5.183.8.1:1337${item?.centro?.avatar?.url}`}
                  subtitle={item.subtitle}
                  img={`http://5.183.8.1:1337${item?.cover?.url}`}
                  title={item.title}
                  date={item.date}
                />
              )
            }}
          />
        </View>
      )}
    </S.Wrapper>
  )
}

export default Feed
