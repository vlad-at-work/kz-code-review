import React from 'react'
import { shallow, mount } from 'enzyme'

import Home from '../Home'

describe('Home', () => {
  it('basic smoke test', () => {
    const shallowContainer = shallow(<Home />)
  });
  
  it('renders an input box when shallow mounted', () => {
    const shallowContainer = shallow(<Home />)
    expect(shallowContainer.find('LinkInput').length).toBe(1)
  })


  it('starts off with no shortened urls', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper.find('ShortenedLink').length).toBe(0)
  })
})