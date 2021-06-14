import { gql } from '@apollo/client'

export const AgendamentosFrament = gql`
  fragment AgendamentosFrament on Agendamentos {
    id
    date
    nome
    published_at
    users_permissions_user {
      id
      email
      username
    }
    centro {
      name
      avatar {
        name
        url
      }
      street
      number
      telephone1
      telephone2
      state
    }
    tipoSangue
    status
    cpf
  }
`
