import axios from 'axios'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.resplice.com/api'
    : 'http://localhost:4000/api'

export const mockApi = axios.create({
  baseURL: 'https://ee53bf02-bbee-4b58-ae55-97f543eee1e0.mock.pstmn.io/api',
  headers: {
    access_token: 'token',
    uuid: '123abc',
    latitude: 44.9824096,
    longitude: -93.2313575,
    accuracy: 1974
  }
})

const api = axios.create({
  baseURL
})

export const updateLocationHeaders = pos => {
  const longitude = pos && pos.coords.longitude
  const latitude = pos && pos.coords.latitude
  const accuracy = pos && pos.coords.accuracy
  api.defaults.headers.common['longitude'] = longitude
  api.defaults.headers.common['latitude'] = latitude
  api.defaults.headers.common['accuracy'] = accuracy
}

export const updateAuthHeaders = session => {
  api.defaults.headers.common['access-token'] = session.access_token
  api.defaults.headers.common['session-uuid'] = session.uuid
}

export default api
