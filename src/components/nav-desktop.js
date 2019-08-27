import React, { Component, createRef } from 'react';
import { navigate } from '@reach/router';
import { Link } from 'gatsby'
import styles from './nav-desktop.module.css'
import cx from 'classnames'
import throttle from 'lodash.throttle'

import logoLg from './wordmark-lg.svg'
import logoSm from './wordmark-sm.svg'
import w from './logo-w.svg'


class DesktopNav extends Component {
  constructor(props) {
    super(props)
    this.navBar = createRef()
    this.logoWrap = createRef()
    this.nav = []
    this.threshold = 600
    this.state = {
      pastThreshold: null,
      isAnimatingLogo: false,
      scrolledDown: false
    }

  }

  componentDidMount() {
    window.addEventListener('scroll', throttle((e) => {
      this.scrollHandler(e)
    }, 100))

    this.setState({
      largeLogo: window.scrollY < this.threshold,
      smallLogo: window.scrollY > this.threshold
    })
  }

  scrollHandler = (e) => {
    const h = window.innerHeight
    const threshold = h * .15

    if ((window.scrollY > threshold) && !this.state.scrolledDown) {
      this.setState({
        scrolledDown: true,
        scrolledUp: false
      }, () => this.scrollAnimation('down'))
    }

    if ((window.scrollY < threshold) && (!this.state.scrolledUp && this.state.scrolledDown)) {
      this.setState({
        scrolledUp: true,
        scrolledDown: false
      }, () => this.scrollAnimation('up'))
    }
  }

  scrollAnimation = (dir) => {
    this.setState({
      largeLogo: dir === 'up',
      smallLogo: dir === 'down'
    })
  }

  setRef = (ref) => {
    this.nav.push(ref);
  }

  render() {
    const { nav } = this.props

    return (
      <div className={styles.block} ref={this.navBar}>
        <nav className={styles.navWrap} role="navigation">
          <a href='/' className={cx(styles.logo, {
            [styles.scrolledLogo]: this.state.pastThreshold
          })}>
              <div
                className={cx(styles.logoWrap)}
                ref={this.logoWrap}>
                  <img className={cx(styles.image, styles.w)} src={w} alt=""/>
                  <img
                  src={logoSm}
                  className={cx(styles.image, styles.small, {
                    [styles.fade]: this.state.largeLogo
                  })}
                  alt="Where the Buffalo Roam"/>

                <img
                  src={logoLg}
                  className={cx(styles.image, styles.large, {
                    [styles.fade]: this.state.smallLogo
                  })}
                  alt="Where the Buffalo Roam"/>
              </div>
          </a>
          <ul className={cx(styles.navigation, {
            [styles.scrolledNav]: this.state.pastThreshold
          })}>
            
            <li className={styles.item}>
              <a 
                className={styles.link} 
                href="/#work"
                onClick={() => {
                  navigate('#work')
                }}
                >
                  Work</a>
            </li>
            {nav.map((item, i) => {
              if (item.slug === 'home' || item.slug === 'work') return

              return (
                <li
                  ref={this.setRef}
                  key={item.id}
                  className={styles.item}
                >
                  { item === 'work' &&
                    <a className={styles.link} href={`/${item.slug}`}>{item.slug.replace('#', '')}</a>
                  }
                  { item !== 'work' &&
                    <Link
                    className={styles.link}
                    to={`/${item.slug}`}
                    activeClassName={styles.active}
                    >{item.slug}</Link>
                  }
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    )
  }
}

export default DesktopNav;
