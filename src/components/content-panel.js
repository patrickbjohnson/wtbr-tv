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
    this.state = {
      isLoading: true
    }
  }

  render() {
    const {
      title,
      slug,
      image,
      body,
      videos,
      currentSlide,
      slideIndex,
      categoryColor
    } = this.props;

    return (
      <MediaQuery maxWidth={767}>
          {(isMobile) => (
            <div className={cx(styles.block, {[styles.mobileBlock]: isMobile})}
              style={{
                'backgroundColor' : categoryColor ? categoryColor : '#fff'
              }}
            >
              <div className={styles.inner}>
                <div className={styles.content}>
                  <h2 className={styles.title}>{title}</h2>
                  {body &&
                    <Markdown
                      className={styles.body}
                      source={body.body}
                    />
                  }
                </div>

                <div className={styles.media}>
                  {videos &&
                    videos.map((v,i) => {
                      return (
                        <VideoPlayer
                          key={i}
                          isCurrent={currentSlide}
                          slideIndex={slideIndex}
                          {...v}
                        />
                      )
                    })
                  }
                  {(image && !videos && !isMobile) &&
                    <Img
                      className={cx(styles.media)}
                      fluid={image.fluid}
                      durationFadeIn={500}
                      title={image.title}
                      alt={image.title}
                      fadeIn
                    />
                  }
                </div>
              </div>
            </div>
          )}
      </MediaQuery>
    )
  }
}

export default ContentPanel
