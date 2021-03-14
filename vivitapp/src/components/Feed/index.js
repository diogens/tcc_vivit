import React from 'react'
import { Avatar, Card, Button, Title, Paragraph } from 'react-native-paper'
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { View } from 'react-native'

export const Feed = ({
  nameUser,
  nameSetor,
  titleNews,
  content,
  source,
  onPress,
  avatar,
  centro
}) => {
  return (
    <Card style={{ borderRadius: 15 }} onPress={onPress}>
      <Card.Title
        title={nameUser}
        subtitle={nameSetor}
        left={() => (
          <View
            style={{
              width: 350,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Avatar.Image
              source={{
                uri: avatar ? avatar : 'https://picsum.photos/700'
              }}
            />
            <Title style={{ marginLeft: 20 }}>{centro}</Title>
          </View>
        )}
      />
      <Card.Cover style={{ height: 400 }} source={{ uri: source }} />
      <Card.Content>
        <Title>{titleNews} </Title>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
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
