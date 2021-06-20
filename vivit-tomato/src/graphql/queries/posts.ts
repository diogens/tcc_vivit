import { gql } from '@apollo/client'
import { PostFrament } from '../fragments/posts'

export const QUERY_POSTS = gql`
  query QueryPosts {
    posts(sort: "createdAt:desc") {
      ...PostFrament
    }
  }

  ${PostFrament}
`

export const QUERY_POSTS_BY_ID = gql`
  query QueryPostById($id: String!) {
    posts(where: { id: $id }) {
      ...PostFrament
    }
  }

  ${PostFrament}
`
