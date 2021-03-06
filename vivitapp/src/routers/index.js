import React from 'react'
import { ActivityIndicator } from 'react-native'

import { User } from '../context/UserContext'

import AuthRoutes from './auth-routes'
import AppRoutes from './app-routes'

const Routes = () => {
  const { loading, autheticated } = React.useContext(User)
  if (loading) {
    return <ActivityIndicator />
  }
  return true ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
