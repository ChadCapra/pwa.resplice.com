import axios from 'axios'

// const baseURL =
//   process.env.NODE_ENV === 'production'
//     ? 'https://api.resplice.com/api'
//     : 'http://localhost:4000/api'

const baseURL = 'http://localhost:4000/api'

export const mockApi = axios.create({
  baseURL: 'https://ee53bf02-bbee-4b58-ae55-97f543eee1e0.mock.pstmn.io/api'
})

export default axios.create({
  baseURL,
  withCredentials: true
})
