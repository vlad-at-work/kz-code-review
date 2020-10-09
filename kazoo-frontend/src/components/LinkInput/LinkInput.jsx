import React from 'react'

import ShortenerService from '../../lib/ShortenerService'

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

  minifyClick = () => {
    this.toggleWorking()
    ShortenerService.shortenUrl(this.state.inputUrl, (e, apiResponse) => {
      // console.log(e, apiResponse)
      if (e) {
        this.props.triggerError(e)
      } else {
        this.props.minifyClickHandler(apiResponse)
      }
      this.toggleWorking()
    })
  }

  render () {
    return (
      <div className="input-group">
        <div className="field has-addons">
          <div className="control is-expanded">
            <input className="input" type="text" placeholder="Paste the url to shorten here" onChange={this.handleUrlInput} />
          </div>
          <div className="control">
            <button className={`button is-warning ${this.state.working ? 'is-loading' : ''}`} onClick={this.minifyClick}>
              <i className="fas fa-cut"></i>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default LinkInput