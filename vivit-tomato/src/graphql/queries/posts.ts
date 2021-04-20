import { gql } from '@apollo/client'

export const QUERY_POSTS = gql`
  query QueryPosts {
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
