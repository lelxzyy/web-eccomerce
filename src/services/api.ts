import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://pay.lelxzyy.my.id/api',
  headers: {
    'Content-Type': 'application/json'
  }
})
