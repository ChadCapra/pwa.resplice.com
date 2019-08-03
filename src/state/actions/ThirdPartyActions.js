import {
  IMPORT_CONTACTS,
  IMPORT_CONTACTS_SUCCESS,
  IMPORT_CONTACTS_FAILURE
} from './types'

export const importGoogleContacts = () => async dispatch => {
  dispatch({ type: IMPORT_CONTACTS })

  const gapi = window.gapi
  const initClient = async () => {
    await gapi.client.init({
      apiKey: 'AIzaSyAUF5AkB-LYMOHHzhgL3TEqRu1ouK5Pa0M',
      discoveryDocs: ['https://people.googleapis.com/$discovery/rest'],
      clientId:
        '523586247790-4orqa8hqo87istol1emdiq6rsmcse4ae.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/contacts'
    })
    const isSignedIn = await gapi.auth2.getAuthInstance().isSignedIn.get()
    gapi.auth2.getAuthInstance().isSignedIn.listen(afterSignIn)
    afterSignIn(isSignedIn)

    if (!isSignedIn) {
      gapi.auth2.getAuthInstance().signIn()
    }
  }

  const afterSignIn = async isSignedIn => {
    try {
      if (isSignedIn) {
        const response = await gapi.client.people.people.connections.list({
          resourceName: 'people/me',
          pageSize: 1000,
          personFields: 'names,photos,emailAddresses,phoneNumbers'
        })

        const contacts = response.result.connections.map(connection => {
          const name = connection.names && connection.names[0].displayName
          const avatar = connection.photos && connection.photos[0].url
          const emails =
            connection.emailAddresses &&
            connection.emailAddresses.map(email => email.value)
          const phones =
            connection.phoneNumbers &&
            connection.phoneNumbers.map(phone => phone.value)
          return {
            name,
            avatar,
            emails,
            phones
          }
        })
        dispatch({ type: IMPORT_CONTACTS_SUCCESS, payload: contacts })
      }
    } catch (err) {
      dispatch({ type: IMPORT_CONTACTS_FAILURE, payload: err })
    }
  }

  try {
    gapi.load('client:auth2', initClient)
  } catch (err) {
    dispatch({ type: IMPORT_CONTACTS_FAILURE, payload: err })
  }
}
