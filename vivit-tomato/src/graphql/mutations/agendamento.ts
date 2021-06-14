import { gql } from '@apollo/client'

export const MUTATION_AGENDAMENTO = gql`
  mutation MutationAgendamento($input: createAgendamentoInput!) {
    createAgendamento(input: $input) {
      agendamento {
        date
        status
        nome
        cpf
        centro {
          name
        }
      }
    }
  }
`
