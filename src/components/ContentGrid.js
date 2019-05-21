import React, { Component } from 'react';
import chunk from 'lodash.chunk'
import ContentBlock from './ContentBlock';
import ContentPanel from './content-panel'
import SectionHeader from './section-header'

import styles from './contentGrid.module.css'

class ContentGrid extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.initalBlocks = []
        this.mq = null
        this.matches = false
        this.state = {
            base: [],
            blocks: [],
            panelRow: null,
            activeBlock: null
        }
    }

    componentDidMount() {
        this.mq = window.matchMedia('(min-width: 768px)');
        this.initalBlocks = this.props.contentBlocks

        this.setState({
            base: this.props.contentBlocks,
            blocks: this.props.contentBlocks,
            chunked: chunk(this.props.contentBlocks, 4),
        }, () => {
            this.matches = this.mq.matches
        })
    }

    getCurrentIndex = () => {
        const blocks = this.state.blocks
        const current = this.state.activeBlock
        return blocks.findIndex((b) => b.id === current.id)
    }

    resetBlocks = () => {
        this.setState({
            blocks: this.initalBlocks,
            activeBlock: null
        })
    }

    blockClickHandler = (block) => {
        this.setState({
            activeBlock: block
        }, () => {
            this.insertPanel()
        })
    }

    insertPanel = () => {
        const current = this.getCurrentIndex();
        const diff = Math.abs((current % 4) - 4)
        const sliceIndex = current + diff;

        const panel = {
            type: 'panel',
            id: `panel-${Math.random()}`,
            block: this.state.activeBlock
        }

        const newBlocks = [
            ...this.state.base.slice(0, sliceIndex),
            panel,
            ...this.state.base.slice(sliceIndex)
        ]

        this.setState({
            chunked: chunk(newBlocks, 4)
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

    setCurrentBlock = (block) => {
        this.setState({
            activeBlock: block
        })
    }

    render() {
        const chunked = this.state.chunked
        const currentBlock = this.state.activeBlock

        return (
            <div className={styles.grid}>
                {this.props.sectionTitle &&
                    <SectionHeader text={this.props.sectionTitle} />
                }
                {chunked && chunked.map((set, i) => {
                    return (
                        <div className={styles.row} key={i}>
                            {set && set.map((block) => {
                                if (block.hasOwnProperty('type')) {
                                    return (
                                        <ContentPanel
                                        key={block.id}
                                            blocks={this.initalBlocks}
                                            prevClickHandler={this.prevBlock}
                                            nextClickHandler={this.nextBlock}
                                            dotHandler={this.setCurrentBlock}
                                            current={currentBlock}
                                        />
                                    )
                                } else {
                                    return (
                                        <div
                                            className={styles.col}
                                            onClick={() => this.blockClickHandler(block)}
                                            key={block.id}
                                        >
                                            <ContentBlock key={block.id} {...block}/>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ContentGrid