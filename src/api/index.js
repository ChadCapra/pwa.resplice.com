import axios from 'axios'

export const prodApi = axios.create({
  baseURL: 'https://api.resplice.com/api'
})

export const mockApi = axios.create({
  baseURL: 'https://ee53bf02-bbee-4b58-ae55-97f543eee1e0.mock.pstmn.io/api'
})

export default axios.create({
  baseURL: 'http://localhost:4000/api'
})
