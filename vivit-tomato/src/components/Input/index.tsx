import React from 'react'
import * as S from './styles'
import { Input as TextInput } from 'react-native-elements'
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import theme from '../../styles/theme'

export type InputProps = {
  label?: string
  placeholder?: string
  icon?: string
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
    placeholder={placeholder}
    /* leftIcon={{ type: 'font-awesome', name: 'chevron-left' }} */
    leftIcon={
      iconCustom ? (
        icon
      ) : (
        <Icon
          name={icon}
          size={30}
          color={theme.theme_colors.orange}
          style={{ paddingLeft: 15, paddingRight: 5 }}
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
