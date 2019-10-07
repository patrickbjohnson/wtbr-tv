import React, { Component } from 'react';
import { Link } from 'gatsby'
import { navigate } from '@reach/router';
import cx from 'classnames'

import logoSm from './wordmark-sm.svg'

import styles from './nav-mobile.module.css'

class MobileNav extends Component {
    constructor(props) {
        super(props)

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
                      <Link
                        className={styles.link}
                        to={`/${item.slug}`}
                        activeClassName={styles.active}
                      >
                        {item.pageName}
                      </Link>
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
