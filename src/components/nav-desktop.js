import React from 'react';
import { Link } from 'gatsby'
import styles from './nav-desktop.module.css'
import cx from 'classnames'

export default ({nav}) => {
    return (
      <div className={styles.block}>
        <nav className={styles.navWrap} role="navigation">
          <a className={styles.logo} href="#">
          <img src="http://placehold.it/200x80" alt=""/>
          </a>
          <ul className={cx(styles.navigation, 'list-inline')}>
            {nav.map((item) => {
              return (
                <li className={styles.item} key={item.id}>
                  <Link className={styles.link} to={item.slug}>{item.pageHeadline}</Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    )
}