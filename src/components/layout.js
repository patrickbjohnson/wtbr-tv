import React from 'react'
import { Link } from 'gatsby'
import PageTransition from 'gatsby-v2-plugin-page-transitions'

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
      <Container>
        <Navigation />
        <div style={{ backgroundColor: '#F8D377' }}>
          <PageTransition
            defaultStyle={{
              transition: 'opacity 1000ms ease-out',
              opacity: 0,
            }}
            transitionStyles={{
              entering: { opacity: 0 },
              entered: { opacity: 1 },
              exiting: { opacity: 0 },
            }}
          >
            { children }
            <Footer unfixed={unfixed} />
          </PageTransition>
        </div>
      </Container>
    )
  }
}

export default Template
