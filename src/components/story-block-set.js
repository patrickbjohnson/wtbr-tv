import React from 'react'
import StoryBlock from './story-block'

import styles from './story-block-set.module.css'

const BlockSet = (props) => {
    const { title, blocks } = props

    return (
        <div className={styles.block}>

            <div className={styles.header}>{title}</div>
            {blocks  && blocks.map((block, i) => <StoryBlock key={i} {...block}/>)}
        </div>
    )
}

export default BlockSet;