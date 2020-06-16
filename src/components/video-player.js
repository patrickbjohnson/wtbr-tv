import React, { Component, createRef, useEffect, useState } from 'react'

import LazyLoad from 'react-lazyload'
import Markdown from 'react-markdown'
import Player from '@vimeo/player'
import cx from 'classnames'
import styles from '../components/video-player.module.css'

function VideoPlayer({
  caption,
  videoUrl,
  classNames,
  title,
  slideIndex,
  isCurrent,
  isFeatured,
  videoIsReady,
  vimeoId = false,
}) {
  const [video, setVideo] = useState(null)
  const videoPlayer = createRef()
  let player = null

  useEffect(() => {
    setVideo(videoPlayer.current)
  }, [])

  if ((video && isCurrent) || (video && isFeatured)) {
    player = new Player(video, {
      id: vimeoId,
      responsive: false,
      controls: true,
    })

    player.on('loaded', () => videoIsReady(true))

    if (isFeatured) {
      player.pause()
    }
  }

  return (
    <div className={cx(styles.block)}>
      <div
        className={cx(classNames, {
          [styles.vimeo]: vimeoId,
        })}
      >
        {vimeoId && <div ref={videoPlayer}></div>}

        {!vimeoId && (
          <video controls className={cx(styles.video, 'video-player')}>
            <source src={videoUrl} />
          </video>
        )}
      </div>
      {caption && (
        <Markdown className={styles.caption} source={caption.caption} />
      )}
    </div>
  )
}

export default VideoPlayer
