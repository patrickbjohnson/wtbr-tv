import React, { Component, createRef } from 'react'
import Img from 'gatsby-image'
import cx from 'classnames'
import Player from '@vimeo/player'
import styles from './home-hero.module.css'

class HomeHero extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loaded: false
        }
    }

    render() {
        const {
            classNames,
            image,
            videoHeroTitle,
            videoUrl,
        } = this.props

        return (
            <div className={cx(styles.block, classNames)}>
                <div className={styles.videoWrapper}>
                  <video
                    onCanPlay={(e) => this.setState({ loaded: true })}
                    className={cx(styles.video, { [styles.loaded]: this.state.loaded })}
                    autoPlay
                    loop
                    muted
                  >
                    <source src={`${videoUrl}#t=40`} type="video/mp4" />
                  </video>
                </div>
                <div className={styles.section} >
                    <div className={styles.content}>
                        <p className={styles.title}>{this.props.videoHeroTitle}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeHero
