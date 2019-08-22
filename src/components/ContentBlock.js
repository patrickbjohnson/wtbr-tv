import React from 'react'
import Img from 'gatsby-image'
import cx from 'classnames'
import styles from './contentBlock.module.css'


export default (props) => {
    const { 
        title, 
        subTitle, 
        description, 
        image,
        inGrid
    } = props;

    return (
        <div className={cx(styles.block, {
            [styles.inGrid]: inGrid
        })}>
            <div className={styles.mediaWrap}>
                {(image && image.fluid) &&
                    <Img 
                    className={styles.media}
                    fluid={image.fluid}
                    durationFadeIn={500}
                    title={image.title}
                    alt={image.title}
                    fadeIn
                />
                }
            </div>
            
            <div className={styles.body}>
                <h2 className={styles.title}>{title}</h2>
                <h3 className={styles.subtitle}>{subTitle}</h3>
                <p className={styles.desc}>{description}</p>
            </div>
        </div>
    )
}
