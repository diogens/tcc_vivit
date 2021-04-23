import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { NormalizedCacheObject } from '@apollo/client/cache/inmemory/types'
// import { setContext } from '@apollo/link-context';

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
*/

export const apolloClient = new ApolloClient<NormalizedCacheObject>({
  link: new HttpLink({ uri: 'http://5.183.8.1:1337/graphql' }),
  cache: new InMemoryCache()
  // link: asyncAuthLink.concat(httpLink),
})
