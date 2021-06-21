import { gql } from '@apollo/client'

export const CentroHospitalarsFrament = gql`
  fragment CentroHospitalarsFrament on CentroHospitalar {
    id
    name
    avatar {
      url
    }
    description
    street
    number
    telephone1
    telephone2
    state
    latitude
    longitude
    gallery {
      id
      url
    }
    posts {
      id
      title
      cover {
        url
      }
    }
  }
`
