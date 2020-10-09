import React from 'react'
import ShortenerService from '../../lib/ShortenerService'

import { Redirect } from 'react-router-dom'

class Redirector extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      noUrl: false,
      redirectTarget: ''
    }
  }
  componentDidMount () {
    ShortenerService.getTargetUrl(this.props.match.params.slug, (e, response) => {
      if (e) {
        this.setState({ noUrl: true })
      } else {
        this.setState({ redirectTarget: response.target_url })

        // Redirecting here
        setTimeout(() => {
          window.location.href = response.target_url
        }, 1000)
      }
    })
  }

  render () {
    const redirectMessage = <section className="hero is-default is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h2 className="title">You are being redirected to:</h2>
          {this.state.redirectTarget ? <h2 className="subtitle">{this.state.redirectTarget}</h2> : '...'}
        </div>
      </div>
    </section>
    return (
      this.state.noUrl ? <Redirect to="/404" /> : redirectMessage
    )
  }
}

export default Redirector