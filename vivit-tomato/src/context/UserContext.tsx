import React from 'react'
import { AsyncStorage, Text, Alert } from 'react-native'
import { useMutation } from '@apollo/client'
import { Snackbar } from 'react-native-paper'
import { MUTATION_LOGIN } from '../graphql/mutations/login'

type SignInProps = {
  username: string
  password: string
}

type AuthenticatedProps = {
  authenticated: boolean
}

type MessageProps = {
  title: string
  message: string
  textBtn: string
  action: (value) => void
}

type UserProps = {
  jwt: string
  user: {
    email: string
    username: string
  }
}

type ContextProps = {
  user: UserProps
  authenticated: AuthenticatedProps
  theme: string
  error: string
  loading: string
  setData: (value) => void
  signIn: (value) => void
  message: (value) => void
}
/* <Partial<ContextProps>> */

export const User = React.createContext<Partial<ContextProps>>({})

export const UserContext = ({ children }) => {
  const [user, setUser] = React.useState<UserProps | undefined>(undefined)
  const [authenticated, setAuthenticated] = React.useState<AuthenticatedProps>({
    authenticated: false
  })

  const [loginUser, { loading: updating, error: updateError }] = useMutation(
    MUTATION_LOGIN
  )

  /*  const [loginUser, { loading: updating, error: updateError }] = useMutation(
    MUTATION_LOGIN
  ) */

  async function signIn({ username, password }: SignInProps) {
    updateError
      ? setAuthenticated({ authenticated: false })
      : message({
          title: 'Error',
          message: 'Usuário ou senha inválidos',
          textBtn: 'OK',
          action: () => console.log('fechando...')
        })

    const response = await loginUser({
      variables: {
        input: {
          identifier: username,
          password: password,
          provider: 'local'
        }
      }
    })

    try {
      setUser(response.data.login)
      setAuthenticated({ authenticated: true })
    } catch (error) {
      return
    }
  }

  function message({ title, message, textBtn, action }: MessageProps) {
    console.log('message ###', title, message, textBtn, action)
    return Alert.alert(title, message, [
      {
        text: textBtn,
        onPress: action,
        style: 'cancel'
      }
    ])
  }

  return (
    <User.Provider value={{ signIn, message, user, authenticated }}>
      {children}
    </User.Provider>
  )
}
