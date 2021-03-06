import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://34.75.86.188:8080'
  /* baseURL: 'http://35.227.11.34:8080' */
  /* baseURL: 'http://192.168.1.73:8080' */
})
