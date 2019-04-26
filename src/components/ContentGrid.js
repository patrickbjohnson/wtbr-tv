import React, { Component } from 'react';
import ContentBlock from './ContentBlock';

import styles from './contentGrid.module.css'

class ContentGrid extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { contentBlocks } = this.props
        return (
            <div className={styles.grid}>
                {contentBlocks.map(block => {
                    return (
                        <div className={styles.col}>
                            <ContentBlock key={block.id} {...block}/>
                        </div>
                    )

                })}
            </div>
        )
    }
}

export default ContentGrid