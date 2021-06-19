import { gql } from '@apollo/client'
import { DatasDisponiveisFrament } from '../fragments/datasDisponiveis'

export const QUERY_DATAS_DISPONIVEIS = gql`
  query QueryDatasDisponiveis {
    datasDisponiveis {
      ...DatasDisponiveisFrament
    }
  }
  ${DatasDisponiveisFrament}
`
