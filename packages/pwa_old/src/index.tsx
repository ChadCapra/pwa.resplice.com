import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { IntlProvider } from 'react-intl'
import { ThemeProvider } from 'styled-components'
import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import respliceState from './store'

import theme from './theme'
import './styles/reset.css'
import './styles/theme.css'
import './styles/index.css'
import Resplice from './Resplice'
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
      <ThemeProvider theme={theme}>
        <Resplice />
      </ThemeProvider>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
ServiceWorker.unregister()
