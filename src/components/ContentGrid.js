import React, { Component } from 'react';
import ContentBlock from './ContentBlock';
import ContentPanel from './content-panel'

import styles from './contentGrid.module.css'

class ContentGrid extends Component {
    constructor(props) {
        super(props)

        this.state = {
            blocks: [],
            activeBlock: null
        }
    }

    componentDidMount() {
        this.setState({
            blocks: this.props.contentBlocks
        })
    }

    getCurrentIndex = () => {
        const blocks = this.state.blocks
        const current = this.state.activeBlock
        return blocks.findIndex((b) => b.id === current.id)
    }

    blockClickHandler = (block) => {
        this.setState({
            activeBlock: block
        })
    }

    nextBlock = () => {
        const currentIndex = this.getCurrentIndex()

        if (currentIndex === this.state.blocks.length - 1) return

        this.setState({
            activeBlock: this.state.blocks[currentIndex + 1]
        })
    }

    prevBlock = () => {
        const currentIndex = this.getCurrentIndex()

        if (currentIndex === 0) return

        this.setState({
            activeBlock: this.state.blocks[currentIndex - 1]
        })
    }

    render() {
        const blocks = this.state.blocks
        const currentBlock = this.state.activeBlock
        return (
            <div className={styles.grid}>
                {blocks && blocks.map(block => {
                    return (
                        <div className={styles.col} onClick={() => this.blockClickHandler(block)}>
                            <ContentBlock key={block.id} {...block}/>
                        </div>
                    )
                })}

                {currentBlock &&
                    <ContentPanel
                        prevClickHandler={this.prevBlock}
                        nextClickHandler={this.nextBlock}
                        current={currentBlock}
                    />
                }

            </div>
        )
    }
}

export default ContentGrid