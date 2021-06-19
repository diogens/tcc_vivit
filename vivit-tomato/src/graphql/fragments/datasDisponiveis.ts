import { gql } from '@apollo/client'

export const DatasDisponiveisFrament = gql`
  fragment DatasDisponiveisFrament on DatasDisponiveis {
    id
    disponibilidade
    published_at
    status
  }
`
