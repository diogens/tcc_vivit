import React from 'react'
import * as S from './styles'
import { Keyboard, StatusBar } from 'react-native'
import Input from '../../components/Input'
import Text from '../../components/Text'
import useForm from '../../hooks/useForms'

import { useMutation } from '@apollo/client'
import { MUTATION_REGISTER } from '../../graphql/mutations/register'
import { TouchableOpacity } from 'react-native-gesture-handler'
import theme from '../../styles/theme'

const SignUp = ({ navigation }) => {
  const username = useForm('')
  const email = useForm('email')
  const password = useForm('')
  const [showKeybord, setShowKeybord] = React.useState(false)

  const [createUser, { loading, error }] = useMutation(MUTATION_REGISTER)

  function signUp() {
    console.log({
      loading
    })
    createUser({
      variables: {
        input: {
          username: username.value,
          email: email.value,
          password: password.value
        }
      }
    })
    !error ? navigation.navigate('SignIn') : alert('Deu Ruim!!')
  }

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
      <Text text="Crie sua conta" fontFamily="ubuntu" size="large" />
      <Input
        placeholder="Nome de Usuário"
        keyboardType="default"
        icon="email"
        {...username}
      />
      <Input
        placeholder="Email"
        keyboardType="email-address"
        icon="email"
        {...email}
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
          signUp()
        }}
      >
        <Text text="Cadastrar" size="xlarge" />
      </TouchableOpacity>

      <S.CreateAccountButtonText
        onPress={() => {
          navigation.navigate('SignIn')
        }}
      >
        <Text
          text="Já possuo uma conta"
          fontFamily="ubuntu"
          size="xlarge"
          color="white"
        />
      </S.CreateAccountButtonText>
    </S.Wrapper>
  )
}

export default SignUp
