import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.respice.com/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': null
  }
})

export default api
