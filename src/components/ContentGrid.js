import React, { Component, createRef } from 'react';
import chunk from 'lodash.chunk'
import uniqBy from 'lodash.uniqby'
import cx from 'classnames'
import ContentBlock from './ContentBlock';
import ContentPanel from './content-panel'
import SectionHeader from './section-header'
import filterPanel from './filter-panel'

import styles from './contentGrid.module.css'
import FilterPanel from './filter-panel';

class ContentGrid extends Component {
    constructor(props) {
        super(props)
        this.filterPanel = createRef()
        this.initalBlocks = []
        this.mq = null
        this.matches = false
        this.state = {
            base: [],
            blocks: [],
            panelRow: null,
            activeBlock: null,
            filterOpen: true,
            categories: [],
            catSelected: false,
        }
    }

    sluggedCategories = (cat) => {
        return cat.toLowerCase().replace(/\s+/g, '-')
    }

    initCategories = (blocks) => {
        if (!this.props.displayCategory) return;
        this.filterPanelClickHandler()

        const cats = blocks.map((block) => {
            const cat = block.category

            return {
                title: cat,
                color: block.categoryColor,
                slug: this.sluggedCategories(cat)
            }
        })

        this.setState({
            categories: uniqBy(cats, 'slug'),
        })
    }

    componentDidMount() {
        this.mq = window.matchMedia('(min-width: 768px)');
        this.initalBlocks = this.props.contentBlocks
        this.setState({
            base: this.props.contentBlocks,
            blocks: this.props.contentBlocks,
            filterOpen: false,
            chunked: chunk(this.props.contentBlocks, 4),
        }, () => {
            this.matches = this.mq.matches
        })

        this.initCategories(this.props.contentBlocks)
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

    filterHeightToggle = () => {
        const cs = this.state.filterOpen
        const openHeight = this.filterPanel.scrollHeight

        if (this.state.filterOpen) {
            this.filterPanel.style.height = `0`
        } else {
            this.filterPanel.style.height = `${openHeight - 45}px`
        }

        this.setState({
            filterOpen: !cs
        })
    }

    filterPanelClickHandler = () => {
        this.filterHeightToggle()
        if (!this.state.catSelected) {
            this.filterContentSelection('*')
        }
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
            ...this.state.blocks.slice(0, sliceIndex),
            panel,
            ...this.state.blocks.slice(sliceIndex)
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

        this.filterHeightToggle()

        this.setState({
            blocks: results,
            catSelected: true,
            chunked: chunk(results, 4)
        })
    }

    render() {
        const { displayCategory } = this.props
        const chunked = this.state.chunked
        const currentBlock = this.state.activeBlock
        const categories = this.state.categories

        return (
            <div className={cx(styles.grid, {
                [styles.gridSpace]: displayCategory
            })}>
                {this.props.sectionTitle &&
                    <SectionHeader text={this.props.sectionTitle} classes='wrapper' />
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
                                            currentBlocks={this.state.blocks}
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

                {displayCategory &&
                    <FilterPanel
                        categories={categories}
                        isOpen={this.state.filterOpen}
                        refHandler={(el) => this.filterPanel = el}
                        selectionHanlder={this.filterContentSelection}
                        panelHandler={this.filterPanelClickHandler}
                    />
                }


            </div>
        )
    }
}

export default ContentGrid
