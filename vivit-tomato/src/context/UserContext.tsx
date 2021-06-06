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
  signOut: (value) => void
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

  async function loadStorageData() {
    const storage = await AsyncStorage.multiGet([
      '@CofferIsland:username',
      '@CofferIsland:email',
      '@CofferIsland:jwt'
    ])

    if (storage[2][1]) {
      setAuthenticated({ authenticated: true })
    } else {
      setAuthenticated({ authenticated: false })
    }

    /* console.log('name=>', storage[0][1])
    console.log('email=>', storage[1][1])
    console.log('token=>', storage[2][1]) */
    console.log('token=>', storage[2][1])
  }

  React.useEffect(() => {
    loadStorageData()
  }, [])

  async function saveDataStore() {
    await AsyncStorage.multiSet([
      ['@CofferIsland:username', user?.user?.username],
      ['@CofferIsland:email', user?.user?.email],
      ['@CofferIsland:jwt', JSON.stringify(user?.jwt)]
    ])
  }

  React.useEffect(() => {
    saveDataStore()
  }, [user])

  async function signIn({ username, password }: SignInProps) {
    if (!updateError) {
      setAuthenticated({ authenticated: false })
    } else {
      message({
        title: 'Error',
        message: 'Usuário ou senha inválidos',
        textBtn: 'OK',
        action: () => console.log('fechando...')
      })
    }

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

  async function signOut() {
    try {
      await AsyncStorage.multiRemove([
        '@CofferIsland:username',
        '@CofferIsland:email',
        '@CofferIsland:jwt'
      ])
      setAuthenticated({ authenticated: false })
    } catch (error) {
      console.log(`erro`)
    } finally {
      setTimeout(() => {
        message({
          title: 'Aviso',
          message: 'Você deslogou',
          textBtn: 'Ok',
          action: () => console.log('ok')
        })
      }, 2000)
    }
  }

  function message({ title, message, textBtn, action }: MessageProps) {
    return Alert.alert(title, message, [
      {
        text: textBtn,
        onPress: action,
        style: 'cancel'
      }
    ])
  }

  return (
    <User.Provider value={{ signIn, signOut, message, user, authenticated }}>
      {children}
    </User.Provider>
  )
}
