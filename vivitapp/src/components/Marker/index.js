import React from 'react'
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Marker as Mark, Callout } from 'react-native-maps'

import * as S from './styles'

export const Marker = ({
  coordinate,
  avatar,
  title,
  address,
  description,
  onPress
}) => {
  return (
    <Mark coordinate={coordinate}>
      <Image
        style={styles.avatar}
        source={{
          uri: avatar
            ? avatar
            : 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
        }}
      />
      <Callout onPress={onPress}>
        <View style={styles.callout}>
          <Text>{title}</Text>
          <Text>{address}</Text>
          <Text>{description}</Text>
        </View>
      </Callout>
    </Mark>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  callout: {
    width: 260
  },

  avatar: {
    width: 54,
    height: 54,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 55
  }
})
