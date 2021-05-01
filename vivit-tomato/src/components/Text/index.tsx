import React from 'react'
import * as S from './styles'

export type TextProps = {
  uppercase?: boolean
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'xxxlarge'
  fontFamily?: 'ubuntu' | 'nada'
  color?:
    | 'primary'
    | 'secondary'
    | 'yellow1'
    | 'yellow2'
    | 'orange'
    | 'tomato'
    | 'white'
  text: string
}

const Text = ({ size, fontFamily, color, text }: TextProps) => (
  <S.Wrapper size={size} color={color} fontFamily={fontFamily}>
    {text}
  </S.Wrapper>
)

export default Text
