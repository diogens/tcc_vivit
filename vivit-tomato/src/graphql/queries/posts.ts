import { gql } from '@apollo/client'

export const QUERY_POSTS = gql`
  query QueryPosts {
    posts {
      id
      title
      subtitle
      date
      description
      centro {
        name
        avatar {
          url
        }
      }
      cover {
        name
        url
      }
    }
  }
`
