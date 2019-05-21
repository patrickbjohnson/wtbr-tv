import React, { Component } from 'react';
import chunk from 'lodash.chunk'
import uniqBy from 'lodash.uniqby'
import ContentBlock from './ContentBlock';
import ContentPanel from './content-panel'
import SectionHeader from './section-header'

import styles from './contentGrid.module.css'

class ContentGrid extends Component {
    constructor(props) {
        super(props)

        this.initalBlocks = []
        this.mq = null
        this.matches = false
        this.state = {
            base: [],
            blocks: [],
            panelRow: null,
            activeBlock: null,
            categories: []
        }
    }

    sluggedCategories = (cat) => {
        return cat.toLowerCase().replace(/\s+/g, '-')
    }

    componentDidMount() {
        this.mq = window.matchMedia('(min-width: 768px)');
        this.initalBlocks = this.props.contentBlocks

        const cats = this.initalBlocks.map((block) => {
            const cat = block.category

            return {
                title: cat,
                slug: this.sluggedCategories(cat)
            }
        })

        this.setState({
            base: this.props.contentBlocks,
            blocks: this.props.contentBlocks,
            categories: uniqBy(cats, 'slug'),
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

    filterContentSelection = (slug) => {
        let results = [];

        if (slug === "*") {
            results = this.initalBlocks
        } else {
            results = this.initalBlocks.filter(block => this.sluggedCategories(block.category) === slug)
        }

        this.setState({
            chunked: chunk(results, 4)
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

                {this.state.categories &&
                    <div>
                        {this.state.categories.map((cat, i) => {
                            return (<span key={i} onClick={() => this.filterContentSelection(cat.slug)}>{cat.title}</span>)
                        })}
                        <span onClick={() => this.filterContentSelection('*')}>reset</span>
                    </div>
                }
            </div>
        )
    }
}

export default ContentGrid