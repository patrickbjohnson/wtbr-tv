import React, { Component } from 'react';

import styles from './content-panel.module.css'

const ContentPanel = (props) => {
    const { nextClickHandler, prevClickHandler, current } = props;

    return (
        <div className={styles.block}>
            <span onClick={() => prevClickHandler() }>Previous</span>
                <div className={styles.inner}>
                    <div className={styles.media}>
                        <img className={styles.image} src={current.backgroundImage.fluid.src} alt=""/>
                    </div>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{current.title}</h2>
                        <h3 className={styles.subtitle}>{current.subTitle}</h3>
                        <p className={styles.text}>{current.description}</p>
                    </div>

                </div>
            <span onClick={() => nextClickHandler()}>Next</span>
        </div>
    )
}

export default ContentPanel