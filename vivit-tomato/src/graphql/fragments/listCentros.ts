import { gql } from '@apollo/client'

export const QueryListCentrosFrament = gql`
  fragment QueryListCentrosFrament on CentroHospitalar {
    id
    name
    avatar {
      url
    }
  }
`
