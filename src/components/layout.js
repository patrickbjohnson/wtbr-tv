import React from 'react'
import { Link } from 'gatsby'
import PageTransition from 'gatsby-plugin-page-transitions'

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
        <PageTransition
          defaultStyle={{
            transition: 'transform 500ms ease-out, opacity 500ms ease-out',
            transform: 'translateY(16px)',
            transformOrigin: '50% 0%',
            opacity: 0
          }}
          transitionStyles={{
            entering: { opacity: 1, transform: 'translateY(0)' },
            entered: { opacity: 1, transform: 'translateY(0)' },
            exiting: { opacity: 1, transform: 'translateY(0)' },
          }}
        >
          { children }
          <Footer unfixed={unfixed} />
        </PageTransition>
      </Container>
    )
  }
}

export default Template
