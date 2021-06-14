import React from 'react'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'
import { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types'
import { AsyncStorage } from 'react-native'
import { setContext } from '@apollo/client/link/context'

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

/* const GRAPHQL_API_URL = 'http://192.168.1.70:1337/graphql' */
const GRAPHQL_API_URL = 'http://5.183.8.1:1337/graphql'

const asyncAuthLink = setContext(async (_, { headers }) => {
  const TOKEN = await AsyncStorage.getItem('@CofferIsland:jwt')
  console.log('#### =>=>2', headers)
  return {
    headers: {
      Authorization: TOKEN ? `Bearer ${JSON.parse(TOKEN)}` : ``
    }
  }
})

const httpLink = createHttpLink({
  uri: GRAPHQL_API_URL
})

export const apolloClient = new ApolloClient<NormalizedCacheObject>({
  link: asyncAuthLink.concat(httpLink),
  cache: new InMemoryCache()
})
/* link: httpLink, */
