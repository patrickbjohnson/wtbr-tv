import React, { Component } from 'react';
import Markdown from 'react-markdown'
import styles from './content-hero.module.css'

const ContentHero = (props) => {

    const {
        heroTitle,
        heroContent,
        backgroundColor,
    } = props

    return (
        <div className={styles.block} style={{
            backgroundColor: backgroundColor ? backgroundColor : '#fff'
        }}>
            <div className={styles.inner}>
                <Markdown className={styles.hero} source={heroTitle.heroTitle} />
                <Markdown className={styles.body} source={heroContent.heroContent} />
            </div>
        </div>
    )
}

export default ContentHero