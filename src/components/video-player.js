import React, { Component, createRef } from 'react'
import cx from 'classnames'
import Markdown from 'react-markdown'

import styles from '../components/video-player.module.css'

function VideoPlayer({ caption, videoUrl, poster, classNames, ...rest }) {
  return (
    <div className={cx(styles.block, classNames)}>
      <video
        controls
        className={cx(styles.video, 'video-player')}
        poster={poster}
      >
        <source src={videoUrl} />
      </video>
      {caption && (
        <Markdown className={styles.caption} source={caption.caption} />
      )}
    </div>
  )
}

export default VideoPlayer
