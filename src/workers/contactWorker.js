import api from '../api'
import { objectArrToDict } from '../helpers'

onmessage = async e => {
  switch (e.data) {
    case 'fetch':
      const contactSummaries = await fetchContactSummaries()
      await updateCache(contactSummaries)
      postMessage('updated')
      // const contactDetails = await fetchContactDetails()
      // updateCache(contactDetails)
      break
    case 'get':
    default:
  }
}

const fetchContactSummaries = async () => {
  try {
    const response = await api.get('/contacts')
    const summaries = objectArrToDict(response.data.ok, 'uuid')
    return summaries
  } catch (err) {
    console.log(err)
  }
}

const fetchContactDetails = async () => {
  // try {
  //   const response = await api.get('')
  // }
}

const updateCache = async contacts => {}
