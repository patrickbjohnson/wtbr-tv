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
}) => (
    <div className={cx(styles.block, {
        [styles.inGrid]: inGrid,
        [styles.active]: active
    })}>
        <div className={styles.mediaWrap}>
            {(image && image.fluid) &&
                <Img
                className={cx(styles.media, {[styles.image]: !!hoverImage })}
                fluid={image.fluid}
                durationFadeIn={500}
                title={image.title}
                alt={image.title}
                fadeIn
            />}
            {(hoverImage && hoverImage.fluid) &&
                <Img
                className={cx(styles.media, styles.hoverImage)}
                fluid={hoverImage.fluid}
                durationFadeIn={500}
                title={hoverImage.title}
                alt={hoverImage.title}
                fadeIn
            />}
        </div>

        <div className={styles.body}>
            <h2 className={styles.title}>{client}</h2>
            <h3 className={styles.subtitle}>{projectTitle}</h3>
        </div>
    </div>
)
