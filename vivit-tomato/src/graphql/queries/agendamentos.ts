import { gql } from '@apollo/client'
import { AgendamentosFrament } from '../fragments/agendamentos'

export const QUERY_AGENTAMENTOS = gql`
  query QueryAgendamentos {
    agendamentos {
      ...AgendamentosFrament
    }
  }
  ${AgendamentosFrament}
`
