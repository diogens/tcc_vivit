import React from 'react'
import { AsyncStorage } from 'react-native'
/* import AsyncStorage from '@react-native-community/async-storage' */
import JWT from 'expo-jwt'

import Feed from './hooks/Feed'
import DatePiker from './hooks/DatePiker'
import Camera from './hooks/Camera'

import { api } from '../services/api'

export const User = React.createContext()

export const UserStorage = ({ children }) => {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [userId, setUserId] = React.useState(null)
  const [dataUser, setData] = React.useState({
    token: '',
    name: '',
    email: ''
  })
  const [loading, setLoading] = React.useState(false)
  const [autheticated, setAutheticated] = React.useState(false)
  const [error, setError] = React.useState('')

  // Hooks
  const { getNewsId, newsId, setNewsId } = Feed()
  const { date, mode, show, setDate, setMode, setShow } = DatePiker()
  const { filesGallery, setFilesGallery } = Camera()

  async function loadStorageData() {
    setLoading(true)
    try {
      const response = await AsyncStorage.multiGet([
        '@VIVIT:name',
        '@VIVIT:token',
        '@VIVIT:email'
      ])

      console.log('name=>', response[0][1])
      console.log('token=>', response[1][1])
      console.log('email=>', response[2][1])

      /*
        response[0][1]  === user
        response[1][1]  === token
        response[2][1]  === email
      */

      /* //se
      if (!response[1][1]) {
        userLogOut()
      } */

      if (response[1][1] && response[2][1]) {
        const token = JSON.parse(response[1][1])
        api.defaults.headers.Authorization = `Bearer ${token}`
        console.log('Autenticado')
        setAutheticated(true)
        setData({ token: response[1][1], name: response[0][1] })
        setName(response[0][1])
        setEmail(response[2][1]) //secret api

        /* const key =
          'IkNdYQafCRK8lSHoCnlChGObvC8CvhmdfJdgUfAXe5F590dEgjoGuIqFxp2z' */
        const key = '620594e38e0b4317c53d3ae3a8cafecf'

        const decodeToken = JWT.decode(token, key)
        console.log('=>', {
          key,
          token,
          decodeToken
        })
        setUserId(decodeToken)
        setTimeout(() => {
          setUserId(decodeToken)
        }, 3000)
        /* setUserId('12312441215124124 teste') */
      } else {
        setAutheticated(false)
        console.log('não Autenticado')
      }
    } catch (err) {
      return false
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  }

  React.useEffect(() => {
    loadStorageData()
  }, [])

  async function userLogin(email, senha) {
    /* const response = await api.post('/auth', {
      email,
      senha
    })
    console.log(response) */
    /*  api.interceptors.request.use(req => {
      console.log("start Req", JSON.stringify(req, null, 2))
      return req
    })
    api.interceptors.response.use(res => {
      console.log("Response", JSON.stringify(res, null, 2))
      return res
    }) */
    console.log(email, senha)
    try {
      const response = await api.post('/auth', {
        email: email,
        password: senha
      })

      /* setAutheticated(true)
      setLoading(true) */
      console.log(response)
      const { token } = response.data

      console.log('login =>', token)

      await AsyncStorage.multiSet([
        ['@VIVIT:email', response.data.email],
        ['@VIVIT:name', response.data.nome],
        ['@VIVIT:token', JSON.stringify(token)]
      ])

      api.defaults.headers.Authorization = `Bearer ${token}`

      setAutheticated(true)
      setLoading(true)
      setError('')
      loadStorageData()
    } catch (err) {
      const { data } = err.response
      setError(`Error: ${data.message}`)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }

  async function userLogOut() {
    try {
      await AsyncStorage.multiRemove([
        '@VIVIT:token',
        '@VIVIT:name',
        '@VIVIT:email'
      ])
      setAutheticated(false)
      setLoading(true)
      setError(``)
    } catch (error) {
      setAutheticated(false)
      console.log(`erro`)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }

    setData({ token: '', name: '', email: '' })
  }

  return (
    <User.Provider
      value={{
        email,
        name,
        dataUser,
        userId,
        loading,
        setLoading,
        error,
        autheticated,
        setAutheticated,
        userLogin,
        userLogOut,
        getNewsId,
        newsId,
        setNewsId,
        date,
        mode,
        show,
        setDate,
        setMode,
        setShow,
        filesGallery,
        setFilesGallery
      }}
    >
      {children}
    </User.Provider>
  )
}
