import Text from '../../components/Text'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'
import * as S from './styles'

export type PropsPost = {
  title: string
  subtitle: string
  user: string
  img: string
  date?: string
  avatar: string
  description?: string
}

const Post = ({
  avatar,
  user,
  date,
  description,
  subtitle,
  title,
  img
}: PropsPost) => (
  <S.Wrapper>
    <S.WrapperAvatar source={{ uri: avatar }} />
    <S.WrapperContent>
      <Text text={user} size="large" fontFamily="ubuntu" />
      <Text text={subtitle} size="medium" fontFamily="ubuntu" color="white" />
      <S.WrapperImage source={{ uri: img }} />
      <S.WrapperAction>
        <FontAwesome name="heartbeat" size={24} color="#fff" />
        <FontAwesome name="heartbeat" size={24} color="#fff" />
        <FontAwesome name="heartbeat" size={24} color="#fff" />
      </S.WrapperAction>
    </S.WrapperContent>
  </S.Wrapper>
)

export default Post
