import React from 'react'
import { shallow, mount } from 'enzyme'
import { act } from 'react-dom/test-utils'

import axios from 'axios'

import Main from '../Main'

/* axios mock reference */

// const axios = {
//   post: jest.fn(() => {
//     return Promise.resolve({
//       data: { slug: '123', original_url: '31231'},
//     });
//   }),

//   create: () => axios,
//   request: {},
//   defaults: {
//     adapter: {},
//     headers: {},
//   },
//   interceptors: {
//     request: {
//       use() {},
//     },
//     response: {
//       use() {},
//     },
//   },
// }

describe('<Main />', () => {
  it('basic smoke test', () => {
    const shallowContainer = shallow(<Main />)
  })
  
  it('renders an input box when shallow()', () => {
    const shallowContainer = shallow(<Main />)
    expect(shallowContainer.find('LinkInput').length).toBe(1)
  })

  it('starts off with no shortened urls', () => {
    const wrapper = shallow(<Main />)
    expect(wrapper.find('ShortenedLink').length).toBe(0)
  })

  it('renders shortenedlink after api submission', async () => {
    axios.post = jest.fn((incomingUrl) => {
      console.log('mocked axios receiving', incomingUrl)
      return Promise.resolve({ data: { id: 123, slug: 'XYZABC', originalUrl: 'http://www.original.url/' }, status: 200 })
    })

    const wrapper = mount(<Main />)

    await act(async () => {
      wrapper.find('#url-input').simulate('change', { target: { value: 'http://www.someurl.com/' }})
      wrapper.find('#submit-url').simulate('click')
    });

    wrapper.update()
    
    expect(wrapper.find('ShortenedLink').length).toBe(1)
  })

  // it('renders error box when malformed url is provided', () => {})
})