import React from 'react'

import './ShortenedLink.css'
import CONFIG from '../../config/config'

class ShortenedLink extends React.Component {
  render () {
    return (
      <div className="box shortened-link has-text-left">
        <article className="media">
          <div className="media-content">
            <div className="content break-words">
              <div className="columns">
                <div className="column is-6">
                  <p>{this.props.originalUrl.substring(0, 100)}</p>
                </div>
                <div className="column is-6 has-text-right">
                  <a className="tag is-info" href={`${CONFIG.rootUrl}/${this.props.slug}`}>
                    <i className="fas fa-link"></i>&nbsp; kazoo.it/{this.props.slug}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    )
  }
}

export default ShortenedLink