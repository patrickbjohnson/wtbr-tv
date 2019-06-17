import React, { Component } from 'react';
import { Link } from 'gatsby'
import cx from 'classnames'

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
        console.log(this.props)

        return (
          <div className={styles.block}>
            <div className={styles.navBar}>
              <a href="#">
                <img src="http://placehold.it/75x25" alt=""/>
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
                {nav.map((item) => {
                  return (
                    <li className={styles.item} key={item.id}>
                      <Link 
                        className={styles.link} 
                        to={item.slug}
                        activeStyle={{ 
                          backgroundColor: item.navColor,
                          color: '#fff' 
                        }}>
                          {item.pageHeadline}
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