import React, { Component, createRef, memo } from 'react'
import cx from 'classnames'
import Img from 'gatsby-image'
import Markdown from 'react-markdown'
import styles from './mobilePanel.module.css'

import VideoPlayer from '../components/video-player'

class ContentPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      isOpen: false,
    }
  }

  render() {
    const {
      client,
      projectTitle,
      body,
      videos,
      image,
      currentSlide,
    } = this.props

    return (
      <div
        ref={this.ref}
        className={cx(styles.block, {
          [styles.open]: currentSlide,
        })}
      >
        <div className={styles.inner}>
          <h2 className={styles.title}>{client}</h2>
          <p className={styles.project}>{projectTitle}</p>
          {body && <Markdown className={styles.body} source={body.body} />}
          <div className={styles.mediaContent}>
            {videos &&
              videos.map((v, i) => {
                return (
                  <VideoPlayer
                    key={i}
                    {...v}
                    isCurrent={currentSlide}
                    poster={image ? image.fluid.src : false}
                    classNames={styles.video}
                  />
                )
              })}
            {image && !videos && (
              <Img
                className={cx(styles.media)}
                fluid={image.fluid}
                durationFadeIn={500}
                title={image.title}
                alt={image.title}
                fadeIn
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

const MemoContentPanel = memo(ContentPanel)

export default MemoContentPanel
