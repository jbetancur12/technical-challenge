import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AppRouter } from './routes'
import { Provider } from 'react-redux'
import store from './store'

function App (): JSX.Element {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
