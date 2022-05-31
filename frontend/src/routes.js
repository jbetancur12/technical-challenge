import React, { useEffect, useState } from 'react'
import { FunctionComponent } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  useParams
} from 'react-router-dom'
import Header from './Component/Header/Header'
import Main from './Component/Main'
import Nav from './Component/Nav/Nav'
import { getUserInfo } from './help/request'

export const AppRouter = () => {
  const [repositories, setRepositories] = useState(0)

  return (
    <Router>
      <Header />
      <Nav publicRepos={repositories} />
      <Switch>
        <Route
          exact
          path="/:username"
          render={(props) => <Main setRepositories={setRepositories} />}
        />
        <Route path="*">
          <Redirect to="/yknx4" />
        </Route>
      </Switch>
    </Router>
  )
}
