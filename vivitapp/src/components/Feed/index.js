import React from 'react'
import { Avatar, Card, Button, Title, Paragraph } from 'react-native-paper'
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'

const LeftContent = (props) => (
  <Avatar.Image {...props} source={{ uri: 'https://picsum.photos/700' }} />
)

export const Feed = ({
  nameUser,
  nameSetor,
  titleNews,
  content,
  source,
  onPress
}) => {
  return (
    <Card style={{ borderRadius: 15 }} onPress={onPress}>
      {/* <Card.Title title={nameUser} subtitle={nameSetor} left={LeftContent} /> */}
      <Card.Content>
        <Title>{titleNews}</Title>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
      <Card.Cover source={{ uri: source }} />
      <Card.Actions>
        <Button>
          <AntDesign name="hearto" size={24} color="black" />
        </Button>
        <Button>
          <MaterialCommunityIcons
            name="comment-processing-outline"
            size={24}
            color="black"
          />
        </Button>
        <Button>
          <Entypo name="share" size={24} color="black" />
        </Button>
      </Card.Actions>
    </Card>
  )
}
