import React from 'react'
import { Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import * as S from './styles'

export type StoryProps = {
  url: string
  title: string
}

const data = [1, 2, 2, 3, 2, 1, 2, 3, 3, 12, 31, 3, 132, 123, 123, 123, 1, 3]

const Story = ({ title, url }: StoryProps) => (
  <S.Wrapper>
    <FlatList
      data={data}
      horizontal
      renderItem={() => (
        <S.WrapperStory
          source={{
            uri:
              'https://avatars.dicebear.com/api/male/john.svg?background=%230000ff'
          }}
        />
      )}
    />
  </S.Wrapper>
)

export default Story
