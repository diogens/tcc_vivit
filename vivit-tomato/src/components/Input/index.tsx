import React, { Component } from 'react'
import * as S from './styles'
import { Input as TextInput } from 'react-native-elements'
import { Text } from 'react-native'
/* import Icon from 'react-native-vector-icons/AntDesign' */
import { AntDesign } from '@expo/vector-icons'
import theme from '../../styles/theme'
import { IconProps } from '@expo/vector-icons/build/createIconSet'

export type InputProps = {
  label?: string
  placeholder?: string
  icon?: undefined
  error?: string
  password?: boolean
  onChangeText?: (value: string) => void
  keyboardType?: string
  onBlurText?: (value) => void
  value?: string
  iconCustom?: string
}

const Input = ({
  label,
  placeholder,
  icon,
  error,
  password,
  onChangeText,
  onBlurText,
  value,
  iconCustom,
  ...props
}: InputProps) => (
  <TextInput
    inputContainerStyle={{
      borderColor: '#fff',
      borderWidth: 1.2,
      borderRadius: 10,
      paddingVertical: 5
    }}
    containerStyle={{ paddingHorizontal: 0 }}
    style={{ color: '#fff' }}
    value={value}
    label={label}
    autoCorrect
    placeholder={placeholder}
    /* leftIcon={{ type: 'font-awesome', name: 'chevron-left' }} */
    leftIcon={
      iconCustom ? (
        icon
      ) : (
        <AntDesign
          name={icon ? icon : 'enviromento'}
          size={30}
          color={theme.theme_colors.orange}
          style={{ paddingLeft: 15, paddingRight: 5 }}
          /* {...props} */
        />
      )
    }
    errorStyle={{ color: 'red' }}
    errorMessage={error}
    secureTextEntry={password}
    onChangeText={onChangeText}
    onBlur={onBlurText}
    {...props}
  />
)

export default Input
