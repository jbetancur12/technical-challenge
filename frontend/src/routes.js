import React, { useEffect, useState } from 'react'
import { FunctionComponent } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  useParams
} from 'react-router-dom'
import { getUserInfo } from './help/request'

export const Main: FunctionComponent = () => {
  const API_URL = 'https://api.github.com/'
  const { username } = useParams<{ username: string }>()
  const [User, setUser] = useState<any>({})
  const [Repos, setRepos] = useState<Array<any>>([])
  useEffect(() => {
    getUserInfo(`${API_URL}users/${username}`).then((resp) => setUser(resp))
  }, [username])

  useEffect(() => {
    getUserInfo(`${API_URL}users/${username}/repos`).then((resp) =>
      setRepos(resp)
    )
  }, [User])
  return (
    <>
      <h1>{User.login}</h1>
      {Repos.map((r) => (
        <h2 key={r.name}>{r.name}</h2>
      ))}
    </>
  )
}

export const AppRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/:username" component={Main} />
      <Route path="*">
        <Redirect to="/yknx4" />
      </Route>
    </Switch>
  </Router>
)
