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
  vimeoId = false,
}) {
  console.log(isCurrent)
  return (
    <div
      className={cx(styles.block, classNames, {
        [styles.vimeo]: vimeoId,
      })}
    >
      {vimeoId && (
        <iframe
          src={isCurrent ? `https://player.vimeo.com/video/${vimeoId}` : ''}
          width="640"
          height="192"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen
        ></iframe>
      )}
      {!vimeoId && (
        <video
          controls
          className={cx(styles.video, 'video-player')}
          poster={poster}
        >
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
