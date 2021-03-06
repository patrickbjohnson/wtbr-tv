import React, { Component, createRef } from 'react'
import Img from 'gatsby-image'
import cx from 'classnames'
import styles from './home-hero.module.css'

class HomeHero extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
    }
  }

  render() {
    const { classNames, videoHeroTitle, videoUrl, image } = this.props

    return (
      <div className={cx(styles.block, classNames)}>
        <div className={styles.videoWrapper}>
          {videoUrl && (
            <video
              poster={image ? image.fluid.base64 : ''}
              onCanPlay={e => this.setState({ loaded: true })}
              className={cx(styles.video, styles.loaded)}
              autoPlay
              loop
              muted
              preload="true"
              playsInline
            >
              <source src={`${videoUrl}`} type="video/mp4" />
            </video>
          )}

          {image && !videoUrl && <Img alt={image.title} fluid={image.fluid} />}
        </div>
        <div className={styles.section}>
          {videoHeroTitle && (
            <div className={styles.content}>
              <p className={styles.title}>{videoHeroTitle}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default HomeHero
