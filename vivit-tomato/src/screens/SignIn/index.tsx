import React from 'react'
import * as S from './styles'
import { Keyboard, StatusBar, TouchableOpacity } from 'react-native'
import Input from '../../components/Input'
import Text from '../../components/Text'
import useForm from '../../hooks/useForms'
import theme from '../../styles/theme'
import { PropsNavigate } from 'router'
import { User } from '../../context/UserContext'

const SignIn = ({ navigation }: PropsNavigate) => {
  const { signIn, message, user, authenticated } = React.useContext(User)

  const username = useForm('')
  const password = useForm('')
  const [showKeybord, setShowKeybord] = React.useState(false)

  React.useEffect(() => {
    console.log('#### user =>', user, authenticated)
  }, [])

  const _keyboardDidShow = () => {
    console.log('Keyboard Shown')
    setShowKeybord(true)
  }

  const _keyboardDidHide = () => {
    console.log('Keyboard Hidden')
    setShowKeybord(false)
  }

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide)

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide)
    }
  }, [])
  return (
    <S.Wrapper>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Text text="VIVIT" fontFamily="ubuntu" size="xxxlarge" />
      <Input
        placeholder="Email"
        keyboardType="email-address"
        icon="email"
        {...username}
      />
      <Input
        placeholder="Password"
        keyboardType="default"
        icon="email"
        {...password}
      />

      <TouchableOpacity
        style={{
          padding: 20,
          paddingHorizontal: 70,
          borderRadius: 10,
          backgroundColor: theme.theme_colors.orange
        }}
        onPress={() => {
          signIn({ username: username.value, password: password.value })
        }}
      >
        <Text text="Entrar" size="xlarge" />
      </TouchableOpacity>

      <S.CreateAccountButtonText
        onPress={() => {
          navigation.navigate('SignUp')
        }}
      >
        <Text
          text="Criar uma conta"
          fontFamily="ubuntu"
          size="xlarge"
          color="white"
        />
      </S.CreateAccountButtonText>
    </S.Wrapper>
  )
}

export default SignIn
