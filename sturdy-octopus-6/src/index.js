import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { addUser } from './actions'
import './index.css'
import App from './App'
import chat from './reducers'

const store = createStore(chat)

// register ourselves as present in the chat
store.dispatch(addUser('Me'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
