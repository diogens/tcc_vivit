import React from 'react'
import { Input as TextInput } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

export const Input = ({
  label,
  placeholder,
  icon,
  error,
  password,
  onChangeText,
  keyboardType,
  onBlurText,
  value,
  iconCustom,
  ...props
}) => {
  return (
    <TextInput
      inputContainerStyle={{
        borderColor: '#fff',
        borderWidth: 1.2,
        borderRadius: 50,
        paddingVertical: 5
      }}
      containerStyle={{ paddingHorizontal: 0 }}
      style={{ color: '#fff' }}
      value={value}
      label={label}
      keyboardType={keyboardType}
      placeholder={placeholder}
      /* leftIcon={{ type: 'font-awesome', name: 'chevron-left' }} */
      leftIcon={
        iconCustom ? (
          icon
        ) : (
          <Icon
            name={icon}
            size={30}
            color="#F6C117"
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
}
