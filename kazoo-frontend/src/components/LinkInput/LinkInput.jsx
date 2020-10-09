import React from 'react'

import ShortenerService from '../../lib/ShortenerService'
import CONFIG from '../../config/config'

import './LinkInput.css'

class LinkInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputUrl: '',
      working: false
    }
  }

  toggleWorking = () => {
    this.setState({
      working: !this.state.working
    })
  }

  handleUrlInput = (e) => {
    this.setState({ inputUrl: e.target.value });
  }

  minifyClick = async () => {
    this.toggleWorking()
    try {
      const response = await ShortenerService.shortenUrl(this.state.inputUrl)
      this.props.minifyClickHandler(response.data)
    } catch (shortenException) {
      if (shortenException.response.status === 400) {
        this.props.triggerError(CONFIG.ERRORS.MALFORMED_URL)
      } else {
        this.props.triggerError(CONFIG.ERRORS.NETWORK_ERROR)
      }
    }
    this.toggleWorking()
  }

  render () {
    return (
      <div className="input-group">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input id="url-input" className="input" type="text" placeholder="Paste the url to shorten here" onChange={this.handleUrlInput} />
          </div>
          <div className="control">
            <button id="submit-url" className={`button is-warning ${this.state.working ? 'is-loading' : ''}`} onClick={this.minifyClick}>
              <i className="fas fa-cut"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default LinkInput