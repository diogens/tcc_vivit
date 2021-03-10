import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://5.183.8.1:1337'
})
