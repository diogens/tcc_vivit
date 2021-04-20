import React from 'react'
import { Button, View, Text } from 'react-native';
import * as S from './styles'

const Map = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Map</Text>
    <Button
      onPress={navigation.openDrawer}
      title="Open navigation drawer"
    />
    <Button
      onPress={() => navigation.goBack()}
      title="Go back home"
    />
  </View>
)

export default Map