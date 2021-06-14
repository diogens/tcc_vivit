import { gql } from '@apollo/client'
import { QueryListCentrosFrament } from '../fragments/listCentros'

export const QUERY_LIST_CENTROS = gql`
  query QueryCentroHospitalar {
    centroHospitalars {
      ...QueryListCentrosFrament
    }
  }
  ${QueryListCentrosFrament}
`
