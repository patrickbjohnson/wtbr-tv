import React, { Component, createRef } from 'react';
import cx from 'classnames'
import Markdown from 'react-markdown'

import styles from '../components/video-player.module.css'

function VideoPlayer({ caption, videoUrl, ...rest }) {
  return (
    <div className={cx(styles.block)}>
      <video controls className={cx(styles.video)}>
        <source src={videoUrl} />
      </video>
      {caption &&
        <Markdown className={styles.caption} source={caption.caption} />
      }
    </div>
  )
}

export default VideoPlayer
