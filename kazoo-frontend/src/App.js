import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Main from './components/Main/Main'
import NotFound from './components/NotFound/NotFound'
import LinkRedirector from './components/LinkRedirector/LinkRedirector'

import 'bulma/css/bulma.min.css'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" component={ Main } exact />
          <Route path="/404" component={ NotFound } exact />
          <Route path="/:slug" component={ LinkRedirector } />
        </Switch>
      </Router>
    )
  }
}

export default App;
