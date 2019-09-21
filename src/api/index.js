import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.resplice.com'
    : 'http://localhost:4000/api'

export const mockApi = axios.create({
  baseURL: 'https://ee53bf02-bbee-4b58-ae55-97f543eee1e0.mock.pstmn.io/api'
})

export const updateLocationHeaders = (api, pos) => {
  const longitude = pos && pos.coords.longitude
  const latitude = pos && pos.coords.latitude
  const accuracy = pos && pos.coords.accuracy
  api.defaults.headers.common['longitude'] = longitude
  api.defaults.headers.common['latitude'] = latitude
  api.defaults.headers.common['accuracy'] = accuracy
}

export default axios.create({
  baseURL
})
