import React from 'react'

import LinkInput from '../LinkInput/LinkInput'
import ShortenedLink from '../ShortenedLink/ShortenedLink'
import Logo from '../Logo/Logo'
import ErrorBox from '../ErrorBox/ErrorBox'

class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false,
      errorText: '',
      shortenedUrls: [
      ]
    }
  }

  minifyClickHandler = (newLinkResponse) => {
    const updatedUrls = [...this.state.shortenedUrls, newLinkResponse]
    this.setState({
      shortenedUrls: updatedUrls,
      hasError: false,
      errorText: ''
    })
  }

  triggerError = (e) => {
    this.setState({
      hasError: true,
      errorText: e
    })
  }

  render () {
    return (
      <section className="hero is-success is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">

            <Logo />

            <div className="columns">
              <div className="column is-3"></div>
              <div className="column is-6">

                <LinkInput minifyClickHandler={this.minifyClickHandler} triggerError={this.triggerError} />

                {this.state.hasError ? <ErrorBox errorText={this.state.errorText} /> : null}

                {this.state.shortenedUrls.map((entry) => (
                  <ShortenedLink key={entry.id} originalUrl={entry.originalUrl} slug={entry.slug} />
                ))}

              </div>
              <div className="column is-3"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home