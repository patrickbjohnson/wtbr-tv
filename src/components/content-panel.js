import React, { Component } from 'react'

import Img from 'gatsby-image'
import InView from '../components/inview'
import Markdown from 'react-markdown'
import MediaQuery from 'react-responsive'
import VideoPlayer from '../components/video-player'
import cx from 'classnames'
import styles from './content-panel.module.css'

class ContentPanel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inView: false,
      videoReady: false,
    }
  }

  videoReadyHandler = state => {
    this.setState({
      videoReady: state,
    })
  }

  render() {
    const {
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
      inGrid,
      panelIsOpen,
      heightHandler,
      ...rest
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

              {panelIsOpen && currentSlide && (
                <div className={styles.mediaContent}>
                  {videos &&
                    videos.map((v, i) => {
                      if (v.__typename === 'ContentfulVideoBlock') {
                        return (
                          <InView key={i}>
                            <VideoPlayer
                              isCurrent={currentSlide}
                              slideIndex={slideIndex}
                              poster={image ? image.fluid.src : false}
                              isFeatured={isFeatured}
                              videoIsReady={this.videoReadyHandler}
                              {...v}
                            />
                          </InView>
                        )
                      }

                      if (v.__typename === 'ContentfulImageBlock') {
                        return (
                          <InView>
                            <Img
                              className={cx(styles.media)}
                              fluid={v.media.fluid}
                              durationFadeIn={500}
                              title={image.title}
                              alt={image.title}
                              fadeIn
                            />
                          </InView>
                        )
                      }
                    })}
                  {image && !videos && !isMobile && (
                    <InView>
                      <Img
                        className={cx(styles.media)}
                        fluid={image.fluid}
                        durationFadeIn={500}
                        title={image.title}
                        alt={image.title}
                        fadeIn
                      />
                    </InView>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </MediaQuery>
    )
  }
}

export default ContentPanel
