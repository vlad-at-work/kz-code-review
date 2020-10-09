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
    this.setState(state => {
      const shortenedUrls = this.state.shortenedUrls.concat(newLinkResponse).reverse()
      return {
        hasError: false,
        errorText: '',
        shortenedUrls
      };
    })
  }

  triggerError = (e) => {
    this.setState({
      hasError: true,
      errorText: e
    })
  }

  render () {

    const shortenedLinkElements = this.state.shortenedUrls.map((link) => {
      return <ShortenedLink
        key={link.id}
        originalUrl={link.originalUrl}
        slug={link.slug} />
    })


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

                {shortenedLinkElements}

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