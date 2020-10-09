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

  initiateRedirect(newUrl) {
    // wee!
    setTimeout(() => {
      window.location.href = newUrl
    }, 2000)
  }

  componentDidMount = async () => {
    try {
      const response = await ShortenerService.getTargetUrl(this.props.match.params.slug)
      this.setState({ redirectTarget: response.data.target_url }) // display target url

      // in a strange case where the saved url is blank
      if (!response.data.target_url) throw new Error('Improper target url from API')
      
      this.initiateRedirect(response.data.target_url)
    } catch(redirectException) {
      this.setState({ noUrl: true }) // redirect to 404 if error response from API
    }
  }

  render () {
    const redirectMessage = (
      <section className="hero is-default is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h2 className="title">You are being redirected to</h2>
            {this.state.redirectTarget ? <h2 className="subtitle">{this.state.redirectTarget}</h2> : ''}
          </div>
        </div>
      </section>
    )

    return (
      this.state.noUrl ? <Redirect to="/404" /> : redirectMessage
    )
  }
}

export default Redirector