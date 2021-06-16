import { gql } from '@apollo/client'
import { AgendamentosFrament } from '../fragments/agendamentos'

export const QUERY_AGENTAMENTOS = gql`
  query QueryAgendamentos($user: String) {
    agendamentos(
      sort: "published_at:asc"
      where: { users_permissions_user: { id: $user } }
    ) {
      ...AgendamentosFrament
    }
  }
  ${AgendamentosFrament}
`
