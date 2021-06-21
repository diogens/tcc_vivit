import React from 'react'
import * as S from './styles'
import { Text, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'

export type MarkerTypesProps = {
  onPress?: () => void
  createdAt?: string
  updatedAt?: string
  name?: string
  avatar?: {
    url?: string
  }
  description?: string
  street?: string
  number?: string
  telephone1?: string
  telephone2?: string
  state?: string
  latitude?: number
  longitude?: number
  /* user: UsersPermissionsUser */
  published_at: string
}

const Marker = ({
  onPress,
  name,
  createdAt,
  street,
  avatar
}: MarkerTypesProps) => (
  <TouchableOpacity onPress={onPress}>
    <S.Wrapper>
      <Avatar
        rounded
        size="medium"
        source={{ uri: `http://5.183.8.1:1337${avatar?.url}` }}
      />
    </S.Wrapper>
  </TouchableOpacity>
)

export default Marker
