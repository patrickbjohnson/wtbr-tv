import React from 'react'
import { Link } from 'gatsby'

import base from './base.css'
import Container from './container'
import Navigation from './navigation'
import Page from '../templates/page'
import Footer from './site-footer'

class Template extends React.Component {
  render() {
    const { location, children, unfixed } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <>
      <Container>
        <Navigation />
        { children }
        
      </Container>
      <Footer unfixed={unfixed} />
      </>
    )
  }
}

export default Template
