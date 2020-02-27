import React, { Component } from 'react'
import cx from 'classnames'
import Img from 'gatsby-image'
import Markdown from 'react-markdown'
import MediaQuery from 'react-responsive'
import styles from './content-panel.module.css'

import VideoPlayer from '../components/video-player'

class ContentPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      title,
      image,
      body,
      videos,
      client,
      projectTitle,
      currentSlide,
      slideIndex,
      categories,
      isFilterable,
      isFeatured,
      bg_color_override,
      whiteBg,
    } = this.props

    let cat = null
    if (categories) {
      cat = categories[0]
    }

    return (
      <MediaQuery maxWidth={767}>
        {isMobile => (
          <div
            className={cx(styles.block, {
              [styles.mobileBlock]: isMobile,
              [styles.isFeatured]: isFeatured,
            })}
            style={{
              backgroundColor:
                bg_color_override && !isFilterable && !whiteBg
                  ? bg_color_override
                  : '#fff',
            }}
          >
            <div className={styles.inner} data-panel-inner="true">
              <div className={styles.content}>
                <h2 className={styles.title}>{client}</h2>
                <p className={styles.project}>{projectTitle}</p>
                {body && (
                  <Markdown className={styles.body} source={body.body} />
                )}
              </div>

              <div className={styles.mediaContent}>
                {videos &&
                  videos.map((v, i) => {
                    if (v.__typename === 'ContentfulVideoBlock') {
                      return (
                        <VideoPlayer
                          key={i}
                          isCurrent={currentSlide}
                          slideIndex={slideIndex}
                          poster={image.fluid.src}
                          {...v}
                        />
                      )
                    }

                    if (v.__typename === 'ContentfulImageBlock') {
                      return (
                        <Img
                          className={cx(styles.media)}
                          fluid={v.media.fluid}
                          durationFadeIn={500}
                          title={image.title}
                          alt={image.title}
                          fadeIn
                        />
                      )
                    }
                  })}
                {image && !videos && !isMobile && (
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
        )}
      </MediaQuery>
    )
  }
}

export default ContentPanel
