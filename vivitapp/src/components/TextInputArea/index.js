import React from 'react'
import { View } from 'react-native'
import { TextInput, Text } from 'react-native'

export const TextInputArea = ({ currentNumber, maxNumber, ...props }) => {
  return (
    <View
      style={{
        paddingVertical: 5
      }}
    >
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={maxNumber}
        style={{
          backgroundColor: '#fff',
          borderBottomColor: '#000000',
          borderBottomWidth: 1,
          height: 'auto',
          borderRadius: 20,
          padding: 20
        }}
      />
      {`${currentNumber}` && maxNumber && (
        <Text style={{ color: '#fff', textAlign: 'right' }}>
          {currentNumber}/{maxNumber}
        </Text>
      )}
    </View>
  )
}
