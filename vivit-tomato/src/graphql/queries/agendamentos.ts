import { gql } from '@apollo/client'
import { AgendamentosFrament } from '../fragments/agendamentos'

export const QUERY_AGENTAMENTOS = gql`
  query QueryAgendamentos($user: String) {
    agendamentos(
      sort: "createdAt:desc"
      where: { users_permissions_user: { id: $user } }
    ) {
      ...AgendamentosFrament
    }
  }
  ${AgendamentosFrament}
`
