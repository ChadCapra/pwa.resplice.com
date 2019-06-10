import {
  SHARE_ATTRIBUTES,
  SHARE_ATTRIBUTES_SUCCESS,
  SHARE_ATTRIBUTES_FAILURE,
  BUILD_SHARE_LIST
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
  // shareList: [],
  shareList: [
    {
      type: 'Email',
      value: 'chad@capabit.com'
    },
    {
      type: 'Phone',
      value: '+1 (218) 591-0657'
    },
    {
      type: 'User',
      value: 'a43e9f5b-7035-4fc8-8f70-03404aaf5a93',
      name: 'Cindy Wu',
      avatar: 'https://i.pravatar.cc/300?img=40'
    },
    {
      type: 'User',
      value: 'a43e9f5b-7035-4fc8-8f70-03404aaf5a94',
      name: 'Jennifer Johnson',
      avatar: 'https://i.pravatar.cc/300?img=43'
    }
  ],
  attribute_shares: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHARE_ATTRIBUTES:
      return { ...state, loading: true }
    case SHARE_ATTRIBUTES_SUCCESS:
      return { ...state, loading: false }
    case SHARE_ATTRIBUTES_FAILURE:
      return { ...state, loading: false, error: action.payload.status }
    case BUILD_SHARE_LIST:
      return {
        ...state,
        shareList: action.payload
      }
    default:
      return state
  }
}
