import React, { Component, createRef } from 'react'
import cx from 'classnames'
import Markdown from 'react-markdown'

import styles from '../components/video-player.module.css'

function VideoPlayer({
  caption,
  videoUrl,
  poster,
  classNames,
  isCurrent,
  isFeatured,
  vimeoId = false,
}) {
  return (
    <div
      className={cx(styles.block, classNames, {
        [styles.vimeo]: vimeoId,
      })}
    >
      {vimeoId && (
        <iframe
          src={
            isCurrent || isFeatured
              ? `https://player.vimeo.com/video/${vimeoId}`
              : ''
          }
          width="640"
          height="192"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>
      )}
      {!vimeoId && (
        <video controls className={cx(styles.video, 'video-player')}>
          <source src={videoUrl} />
        </video>
      )}
      {caption && (
        <Markdown className={styles.caption} source={caption.caption} />
      )}
    </div>
  )
}

export default VideoPlayer
