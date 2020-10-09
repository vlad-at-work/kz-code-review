const CONFIG = {
  rootUrl: process.env.REACT_APP_ROOT_URL || 'http://localhost:3000',
  apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:4567/',
  ERRORS: {
    MALFORMED_URL: 'Malformed URL. Make sure it includes http:// or https://',
    NETWORK_ERROR: 'There\'s been a network error. Try again later'
  }
}

export default CONFIG