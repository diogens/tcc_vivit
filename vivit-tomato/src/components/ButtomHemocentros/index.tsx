import React from 'react'
import { Text } from 'react-native'
import { Fontisto } from '@expo/vector-icons';

import * as S from './styles'

export type ButtonProps = {
  color: string
  size: number
}

const ButtomHemocentros = ({
  color = '#000',
  size = 24 }: ButtonProps) => (
  <S.Wrapper>
   <Fontisto style={{marginBottom: 20}} name="map-marker-alt" size={size} color={color} />
  </S.Wrapper>
)

export default  ButtomHemocentros
