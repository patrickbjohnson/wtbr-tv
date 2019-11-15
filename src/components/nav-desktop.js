import React, { Component, createRef } from 'react';
import { Link } from 'gatsby'
import styles from './nav-desktop.module.css'
import cx from 'classnames'
import throttle from 'lodash.throttle'
import TransitionLink from 'gatsby-plugin-transition-link'
import { TransitionPortal } from "gatsby-plugin-transition-link";

import logoLg from './wordmark-lg.svg'
import logoSm from './wordmark-sm.svg'


class DesktopNav extends Component {
  constructor(props) {
    super(props)
    this.navBar = createRef()
    this.logoWrap = createRef()
    this.pageSlide = createRef()
    this.nav = []
    this.threshold = 600
    this.state = {
      pastThreshold: null,
      isAnimatingLogo: false,
      scrolledDown: false,
      smallLogo: false, 
      largeLogo: true
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
              <Link className={styles.link} to="/#work">Work</Link>
            </li>
            {nav.map((item, i) => {
              if (item.slug === 'home' || item.slug === 'work') return
              return (
                <li
                  ref={this.setRef}
                  key={item.id}
                  className={styles.item}
                >
                  {item.slug.includes('#') &&
                    <a className={styles.link} href={item.slug}>{item.pageName.replace('#', '')}</a>
                  }
                  { item !== 'work' &&
                    <TransitionLink 
                      className={styles.link} 
                      activeClassName={styles.active}
                      to={`/${item.slug}`}
                      exit={{
                        trigger: ({ exit, node }) => {
                          const slide = this.pageSlide.current
                          slide.style.transition = 'opacity .35s ease-out'
                          slide.style.opacity = 1
                        },
                        length: 2
                      }}
                      entry={{
                        trigger: ({ enter, node }) => {
                          const slide = this.pageSlide.current
                          slide.style.opacity = 0
                        },
                        delay: .5
                      }}
                    >
                      {item.pageName}
                      <TransitionPortal>
                        <div
                          ref={this.pageSlide}
                          style={{
                            position: "fixed",
                            background: "#F8D377",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            opacity: 0,
                            width: "100vw",
                            height: "100vh",
                            pointerEvents: 'none'
                          }}
                        ></div>
                      </TransitionPortal>
                    </TransitionLink>
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
