import {
  QR_SHARE_ERROR,
  INVITE,
  INVITE_SUCCESS,
  INVITE_FAILURE
} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  error: null,
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
    case QR_SHARE_ERROR:
      return { ...state, error: action.payload }
    case INVITE:
      return { ...state, loading: true }
    case INVITE_SUCCESS:
      return { ...state, loading: false }
    case INVITE_FAILURE:
      return { ...state, loading: false, err: action.payload }
    default:
      return state
  }
}
