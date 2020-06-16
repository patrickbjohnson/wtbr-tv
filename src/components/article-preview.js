import Img from 'gatsby-image'
import Markdown from 'react-markdown'
import React from 'react'
import VideoPlayer from './video-player'
import cx from 'classnames'
import styles from './article-preview.module.css'

const formatDate = date => {
  const d = new Date(date)
  const rawDay = d.getDate()
  const rawMonth = d.getMonth()
  const rawYear = d.getFullYear()

  const day = rawDay >= 10 ? rawDay : '0' + rawDay
  const month = rawMonth >= 10 ? rawMonth : '0' + rawMonth
  const year = rawYear.toString().substr(-2)
  return `${month}.${day}.${year}`
}

export default ({ article }) => {
  const { node } = article

  return (
    <div className="article-wrap">
      <article className={cx(styles.article)} id={node.slug}>
        <div className={styles.meta}>
          <h2 className={styles.title}>{node.title}</h2>
          <small>{formatDate(node.publishDate)}</small>
        </div>
        {/* {node.video && <VideoPlayer videoUrl={node.video.videoUrl} />} */}
        {node.video && <VideoPlayer {...node.video} isCurrent />}
        {!node.video && node.image && (
          <Img
            className={styles.image}
            alt={node.title}
            fluid={node.image.fluid}
          />
        )}

        <div className={styles.content}>
          <Markdown
            className={styles.body}
            source={node.body.body}
            escapeHtml={false}
          />
        </div>
      </article>
    </div>
  )
}
