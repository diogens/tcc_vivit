import React from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types'
import { AsyncStorage } from 'react-native'
import { setContext } from '@apollo/link-context'

/*
uncomment the code below in case you are using a GraphQL API that requires some form of
authentication. asyncAuthLink will run every time your request is made and use the token
you provide while making the request.
const TOKEN = '';
const asyncAuthLink = setContext(async () => {
  return {
    headers: {
      Authorization: TOKEN,
    },
  };
});
await AsyncStorage.getItem('@CofferIsland:username')
*/

const GRAPHQL_API_URL = 'http://5.183.8.1:1337/graphql'

const asyncAuthLink = setContext(async () => {
  const TOKEN = await AsyncStorage.getItem('@CofferIsland:username')
  console.log('### =>=>', TOKEN)
  return {
    headers: {
      Authorization: TOKEN
    }
  }
})

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL
})

export const apolloClient = new ApolloClient<NormalizedCacheObject>({
  /* link: asyncAuthLink.concat(httpLink), */
  link: httpLink,
  cache: new InMemoryCache()
})
