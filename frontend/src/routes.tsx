import React, { useState } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom'
import Header from './Component/Header/Header'
import Main from './Component/Main'
import Nav from './Component/Nav/Nav'

export const AppRouter = (): JSX.Element => {
  const [repositories, setRepositories] = useState<number>(0)

  const setNumberRepos = (n: number): void => {
    setRepositories(n)
  }

  return (
    <Router>
      <Header />
      <Nav publicRepos={repositories} />
      <Switch>
        <Route
          exact
          path='/:username'
          render={() => <Main setRepositories={setNumberRepos} />}
        />
        <Route path='*'>
          <Redirect to='/yknx4' />
        </Route>
      </Switch>
    </Router>
  )
}
