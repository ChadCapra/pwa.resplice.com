import React from 'react'
import ReactDOM from 'react-dom'
import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import respliceState from './store'

import './styles/reset.css'
import './styles/theme.css'
import './styles/index.css'
// import Resplice from './Resplice'
import Sandbox from './components/Sandbox'
import * as ServiceWorker from './serviceWorker'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  respliceState,
  composeEnhancers(applyMiddleware(reduxThunk))
)

// console.log(store.getState().userState.profile)

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={'en'}>
      {/* <Resplice /> */}
      <Sandbox />
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ServiceWorker.unregister()
