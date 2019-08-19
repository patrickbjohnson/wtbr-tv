import React, { Component, createRef } from 'react';
import { Link } from 'gatsby'
import styles from './nav-desktop.module.css'
import cx from 'classnames'
import throttle from 'lodash.throttle'

import logoLg from './wordmark-lg.svg'
import logoSm from './wordmark-sm.svg'


class DesktopNav extends Component {
  constructor(props) {
    super(props)
    this.navBar = createRef()
    this.nav = []
    this.state = {
      pastThreshold: null
    }

  }

  componentDidMount() {
    window.addEventListener('scroll', throttle((e) => {
      this.scrollHandler(e)
    }, 100))
  }

  scrollHandler = (e) => {
    const h = window.innerHeight
    const threshold = h * .15

    this.setState({
      pastThreshold: window.scrollY > threshold
    })
  }

  hoverHandler = (index, item, state) => {
    const navItem = this.nav[index]

    if (state) {
      navItem.style.backgroundColor = item.navColor
    } else {
      navItem.style.backgroundColor = '#fff'
    }
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
            {this.state.pastThreshold ?
              <img src={logoSm} className={cx(styles.image, styles.small)} alt="Where the Buffalo Roam"/>
              :
              <img src={logoLg} className={cx(styles.image)} alt="Where the Buffalo Roam"/>
            }
          </a>
          <ul className={cx(styles.navigation, {
            [styles.scrolledNav]: this.state.pastThreshold
          })}>
            {nav.map((item, i) => {
              if (item.slug === 'home') return false;

              return (
                <li
                  ref={this.setRef}
                  key={item.id}
                  className={styles.item}
                >
                  <Link
                  className={styles.link}
                  to={`/${item.slug}`}
                  activeClassName={styles.active}
                  >{item.slug}</Link>
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
