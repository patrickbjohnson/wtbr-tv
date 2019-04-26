import React from 'react'

import styles from './contentBlock.module.css'

export default (props) => {
    const { title, subTitle, description, backgroundImage } = props;

    return (
        <div className={styles.block} style={{backgroundImage: `url(${backgroundImage.fluid.src})`}}>
            <h2 className={styles.title}>{title}</h2>
            <h3 className={styles.subtitle}>{subTitle}</h3>
            <p className={styles.desc}>{description}</p>
        </div>
    )
}
