import axios from 'axios'
import CONFIG from '../config/config'

const ShortenerService = {
  async shortenUrl (originalUrl, cb) {
    try {
      const response = await axios.post(`${CONFIG.apiUrl}`, {
        url: originalUrl
      })
      cb(null, response.data)
    } catch (minificationError) {
      if (minificationError.response.status === 400) {
        cb(CONFIG.ERRORS.MALFORMED_URL, null)
      } else {
        cb(CONFIG.ERRORS.NETWORK_ERROR, null)
      }
    }
  },

  async getTargetUrl (slug, cb) {
    try {
      const response = await axios.get(`${CONFIG.apiUrl}lookup/${slug}`)
      cb(null, response.data)
    } catch (exc) {
      // unable to redirect
      cb(exc, null)
    }
  }
}

export default ShortenerService