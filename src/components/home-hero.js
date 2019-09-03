import React, { Component, createRef } from 'react'
import cx from 'classnames'
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
            <source src={`${videoUrl}`} type="video/mp4" />
          </video>
        </div>
        <div className={styles.section} >
          {videoHeroTitle &&
          <div className={styles.content}>
            <p className={styles.title}>{videoHeroTitle}</p>
          </div>
          }
        </div>
      </div>
    )
  }
}

export default HomeHero
