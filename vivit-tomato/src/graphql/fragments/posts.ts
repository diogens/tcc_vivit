import { gql } from '@apollo/client'

export const PostFrament = gql`
  fragment PostFrament on Posts {
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
`
