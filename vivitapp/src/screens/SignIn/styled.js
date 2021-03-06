import styled from 'styled-components/native'
import { Platform } from 'react-native'

export const Container = styled.View`
  flex: 1;
  background-color: green;
  padding: 0 20px ${Platform.OS === 'android' ? 0 : 30}px;
`
