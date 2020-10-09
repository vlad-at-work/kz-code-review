import axios from 'axios'
import CONFIG from '../config/config'

const ShortenerService = {
  shortenUrl (originalUrl) {
    return axios.post(`${CONFIG.apiUrl}`, {
      url: originalUrl
    })
  },

  getTargetUrl (slug) {
    return axios.get(`${CONFIG.apiUrl}lookup/${slug}`)
  }
}

export default ShortenerService