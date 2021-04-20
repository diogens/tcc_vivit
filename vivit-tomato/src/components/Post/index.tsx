import React from 'react'
import * as S from './styles'

export type PropsPost = {
  title: string
  subtitle: string
  url: string
  date: string
  avatar: string
  description: string
}

const Post = ({
  avatar,
  date,
  description,
  subtitle,
  title,
  url
}: PropsPost) => (
  <S.Wrapper>
    <S.WrapperImage />
    <S.WrapperText>{title}</S.WrapperText>
  </S.Wrapper>
)

export default Post
