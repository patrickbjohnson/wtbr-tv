import React, { Component } from 'react';

import styles from './content-hero.module.css'

const ContentHero = (props) => {
    const { heroTitle, heroContent, backgroundColor } = props;

    return (
        <div className={styles.hero} style={{
            backgroundColor: backgroundColor ? backgroundColor : '#fff'
        }}>
            <div className={styles.inner}>
                <div className={styles.left}>
                    <h1 className={styles.title}>{heroTitle}</h1>
                </div>
                <div className={styles.right} dangerouslySetInnerHTML={{
                    __html: heroContent.heroContent,
                }}></div>
            </div>
        </div>
    )
}

export default ContentHero