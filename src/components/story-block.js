import React from 'react';

import styles from './story-block.module.css'
const StoryBlock = (props) => {
    const { title, text, image, color } = props
    return (
        <div className={styles.block} style={{
            backgroundColor: color
        }}>
            <div className={styles.inner}>
                <div className={styles.media} style={{
                    'backgroundImage': `url(${image})`
                }}/>
                <div className={styles.content}>
                    <div className={styles.contentInner}>
                        <h2 className={styles.title}>{title}</h2>
                        <p className={styles.text}>{text}
                            <span className={styles.arrow}><svg width='64' height='10' xmlns='http://www.w3.org/2000/svg'><path d='M54.57 5.5H.43v-1h54.14v-4l9 4.5-9 4.5v-4z' /></svg></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoryBlock;