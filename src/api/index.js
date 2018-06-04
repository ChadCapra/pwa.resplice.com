import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.respice.com/'
})

export default api
