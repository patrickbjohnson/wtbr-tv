import React, { Component, createRef } from 'react';
import { Link } from 'gatsby'
import { navigate } from '@reach/router';
import cx from 'classnames'
import TransitionLink from 'gatsby-plugin-transition-link'
import { TransitionPortal } from "gatsby-plugin-transition-link";

import logoSm from './wordmark-sm.svg'

import styles from './nav-mobile.module.css'

class MobileNav extends Component {
    constructor(props) {
      super(props)
      this.pageSlide = createRef()
      this.state = {
        isOpen: false
      }
    }

    toggleMenu = () => {
      this.setState(prevState => ({
        isOpen: !prevState.isOpen
      }));
    }

    render() {
        const  { nav } = this.props

        return (
          <div className={styles.block}>
            <div className={styles.navBar}>
              <a className={styles.logo} href="/">
                <img src={logoSm} alt="Where the Buffalo Roam"/>
              </a>

              <div className={cx(styles.menu, {
                [styles.isOpen]: this.state.isOpen
              })} onClick={this.toggleMenu}>
                <span className={styles.menuBar}></span>
                <span className={styles.menuBar}></span>
                <span className={styles.menuBar}></span>
              </div>
            </div>
            <nav className={cx(styles.navWrap, { [styles.isOpen]: this.state.isOpen })} role="navigation">
              <ul className={cx(styles.navigation, 'list-inline')}>
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
                {nav.map((item) => {
                  if (item.slug === 'home' || item.slug === 'work') return

                  return (
                    <li className={styles.item} key={item.id}>
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
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        )
    }
}

export default MobileNav
