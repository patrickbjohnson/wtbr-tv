import React, { Component } from 'react';

import logo from './circle-logo.png';
import styles from './site-footer.module.css'

const Footer = (props) => {

    return (
        <div className={styles.footer}>
            <div className={styles.content}>
                <h3 className={styles.title}>Purveyor of good things.</h3>
                <div className={styles.links}>
                    <a href="#">Twitter</a>
                    <a href="#">Instagram</a>
                    <a href="#">Facebook</a>
                    <a href="#">Email</a>
                    <a href="#">123-456-7890</a>
                    <a href="#">jobs</a>
                </div>
            </div>

            <div className={styles.logo}>
                <img src={logo} alt="Where The Buffalo Roam Logo"/>
            </div>
            <p className={styles.copyright}>&copy; WTBR {new Date().getFullYear()}</p>
        </div>
    )
}

export default Footer
