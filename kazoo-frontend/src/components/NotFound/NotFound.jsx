import React from 'react'

class Redirector extends React.Component {
  render () {
    return (<section className="hero is-default is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">404 Error</h1>
          <h2 className="subtitle">The requested shortened link wasn't found :(</h2>
          <a href="/">
            <small>Back Home</small>
          </a>
        </div>
      </div>
    </section>)
  }
}

export default Redirector