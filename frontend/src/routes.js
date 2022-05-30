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

export const AppRouter = () => (
  <Router>
    <Header />
    <Nav />
    <Switch>
      <Route exact path="/:username" component={Main} />
      <Route path="*">
        <Redirect to="/yknx4" />
      </Route>
    </Switch>
  </Router>
)
