import { FETCH_ATTRIBUTES } from '../actions/types'
import { bindActionCreators } from '../../../../Library/Caches/typescript/3.2/node_modules/redux'

const INITIAL_STATE = {
  types: [
    {
      id: 1,
      defaultCollection: 'Phone',
      value: 'phone',
      text: 'Phone'
    },
    {
      id: 2,
      defaultCollection: 'Email',
      value: 'email',
      text: 'Email'
    },
    {
      id: 3,
      defaultCollection: 'Address',
      value: 'address',
      text: 'Address'
    },
    {
      id: 4,
      defaultCollection: 'Social Media',
      value: 'socialMedia',
      text: 'Social Media'
    },
    {
      id: 5,
      defaultCollection: 'Other',
      value: 'text',
      text: 'Text'
    },
    {
      id: 6,
      defaultCollection: 'Other',
      value: 'date',
      text: 'Date'
    },
    {
      id: 7,
      defaultCollection: 'Other',
      value: 'dateTime',
      text: 'Date/Time'
    }
  ],
  collections: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_ATTRIBUTES:
      const collections = []
      action.payload.forEach(attr => {})

      return { ...state, collections }
    default:
      return state
  }
}
