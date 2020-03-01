import React from 'react'
import Img from 'gatsby-image'
import cx from 'classnames'
import styles from './contentBlock.module.css'

export default ({
  active,
  description,
  hoverImage,
  image,
  inGrid,
  subTitle,
  title,
  client,
  projectTitle,
  panelIsOpen,
  showHover = true,
}) => {
  return (
    <div
      className={cx(styles.block, {
        [styles.inGrid]: inGrid,
        [styles.active]: active,
      })}
    >
      <div className={styles.mediaWrap}>
        {image && image.fluid && (
          <Img
            className={cx(styles.media, {
              [styles.image]: !!hoverImage && showHover,
            })}
            fluid={image.fluid}
            durationFadeIn={500}
            title={image.title}
            alt={image.title}
            fadeIn
          />
        )}
        {showHover && hoverImage && hoverImage.fluid && (
          <div className={cx(styles.media, styles.hoverImage)}>
            <img src={hoverImage.fluid.src} alt={hoverImage.title} />
          </div>
        )}
      </div>

      <div className={styles.body}>
        <h2 className={styles.title}>{client}</h2>
        <h3 className={styles.subtitle}>{projectTitle}</h3>
      </div>
    </div>
  )
}
