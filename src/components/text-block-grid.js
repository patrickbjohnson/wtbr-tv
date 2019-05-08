import React from 'react';

import styles from './text-block-grid.module.css'

const TextBlockGrid = (props) => {
    const { textBlocks } = props

    return (
        <div className={styles.grid}>
            {textBlocks.map(block => {
                return (<div className={styles.block} key={block.id}>
                    <h2>{block.title}</h2>
                    <div dangerouslySetInnerHTML={{
                        __html: block.description.description
                    }}></div>
                </div>)
            })}
        </div>
    )
}

export default TextBlockGrid