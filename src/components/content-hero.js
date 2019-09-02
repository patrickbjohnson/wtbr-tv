import React from 'react';
import Markdown from 'react-markdown'
import styles from './content-hero.module.css'

import Transition from './transition'

function ContentHero(props) {
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
                <Transition className={styles.hero}>
                  <Markdown source={heroTitle.heroTitle} />
                </Transition>
                <Transition delay={250} className={styles.body}>
                  <Markdown source={heroContent.heroContent} />
                </Transition>
            </div>
        </div>
    )
}

export default ContentHero
