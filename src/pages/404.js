import React from 'react'
import { Link, graphql } from 'gatsby'
import cx from 'classnames'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './404.module.css'
import Container from '../components/container'
import Navigation from '../components/navigation'
import Footer from '../components/site-footer'


class ErrorPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Container>
        <Navigation />
          <div className={styles.page}>
            <h2 className={cx(styles.text, styles.top)}>404</h2>
            <h3 className={cx(styles.text, styles.bottom)}>I think you're lost.</h3>
          </div>
        <Footer />
      </Container>
    )
  }
}

export default ErrorPage