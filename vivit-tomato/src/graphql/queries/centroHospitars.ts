import { gql } from '@apollo/client'
import { CentroHospitalarsFrament } from '../fragments/centroHospitalars'

export const QUERY_CENTRO_HOSPITALARS = gql`
  query QueryCentroHospitalars {
    centroHospitalars {
      ...CentroHospitalarsFrament
    }
  }
  ${CentroHospitalarsFrament}
`
