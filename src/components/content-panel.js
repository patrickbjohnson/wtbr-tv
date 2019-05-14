import React, { Component } from 'react'
import cx from 'classnames'

import styles from './content-panel.module.css'

const ContentPanel = (props) => {
    const { nextClickHandler, prevClickHandler, dotHandler, blocks, current } = props;

    return (
        <div className={styles.block}>
            <span className={cx(styles.pagination, styles.prev)} onClick={() => prevClickHandler() }>Prev</span>
                <div className={styles.inner}>
                    <div className={styles.media}>
                        <img className={styles.image} src={current.backgroundImage.fluid.src} alt=""/>
                    </div>

                    {blocks &&
                        <div className={styles.mobilePagination}>
                            {blocks.map(block => {
                                return (
                                    <span onClick={() => dotHandler(block)}
                                    className={cx(styles.dot, {
                                        [styles.activeDot]: block.id === current.id
                                    })}
                                    key={block.id}></span>
                                )
                            })}
                        </div>
                    }

                    <div className={styles.content}>
                        <h2 className={styles.title}>{current.title}</h2>
                        <h3 className={styles.subtitle}>{current.subTitle}</h3>
                        <p className={styles.text}>{current.description}</p>
                    </div>

                </div>
            <span className={cx(styles.pagination, styles.next)} onClick={() => nextClickHandler()}>Next</span>
        </div>
    )
}

export default ContentPanel