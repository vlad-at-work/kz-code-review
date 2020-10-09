import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Home from './components/Home/Home'
import NotFound from './components/NotFound/NotFound'
import LinkRedirector from './components/LinkRedirector/LinkRedirector'

import 'bulma/css/bulma.min.css'
import './styles/App.css'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" component={ Home } exact />
          <Route path="/404" component={ NotFound } exact />
          <Route path="/:slug" component={ LinkRedirector }/>
        </Switch>
      </Router>
    )
  }
}

export default App;
