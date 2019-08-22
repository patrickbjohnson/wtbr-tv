import React, { Component, createRef } from 'react';
import chunk from 'lodash.chunk'
import uniqBy from 'lodash.uniqby'
import cx from 'classnames'
import ContentBlock from './ContentBlock';
import ContentPanel from './content-panel'
import SectionHeader from './section-header'
import Flickity from 'flickity';
import MediaQuery from 'react-responsive';

import FilterPanel from './filter-panel';

import styles from './contentGrid.module.css'

class ContentGrid extends Component {
    constructor(props) {
        super(props)
        this.filterPanel = createRef()
        this.slider = createRef()
        this.initalBlocks = []
        this.flick = null
        this.mq = null
        this.matches = false
        this.state = {
            base: props.contentBlocks,
            blocks: props.contentBlocks,
            categories: [],
            filterOpen: false,
            catSelected: false,
            sliderRow: -1,
            active: 0,
            panelIsOpen: false,
            isFirst: false,
            isLast: false
        }
    }

    componentDidMount() {
        this.initCategories(this.props.contentBlocks)
    }

    getCurrentIndex = () => {
        const blocks = this.state.base
        const current = this.state.activeSlide
        return blocks.findIndex((b) => b.id === current.id)
    }

    insertBlock = () => {
      this.setState({
        sliderRow: this.getCurrentIndex() + 1
      })
    }

    blockHandler = (block, index) => {
        this.setState({
            activeSlide: block,
            panelIsOpen: true
        }, () => {
            this.insertBlock()
            // this.flickityIntoView()
        })
    }

    sluggedCategories = (cat) => {
        return cat ? cat.toLowerCase().replace(/\s+/g, '-') : false
    }

    initCategories = (blocks) => {
        if (!this.props.displayCategory) return;

        const cats = blocks.map((block) => {
            const cat = block.category
            return {
                title: cat,
                color: block.categoryColor,
                slug: this.sluggedCategories(cat)
            }
        }).filter(c => !!c.slug)

        this.setState({
            categories: uniqBy(cats, 'slug'),
        })
    }

    filterHeightToggle = () => {
        const cs = this.state.filterOpen
        const openHeight = this.filterPanel.scrollHeight
        const PADDING_BUFFER = 45

        if (this.state.filterOpen) {
            this.filterPanel.style.height = `0`
        } else {
            this.filterPanel.style.height = `${openHeight - PADDING_BUFFER}px`
        }

        this.setState({
            filterOpen: !cs
        })
    }

    filterReset = () => {
        this.setState({
            activeSlide: -1,
            panelIsOpen: false
        }, ()=> {
            console.log(this.state)
        })
    }

    filterContentSelection = (slug) => {
        let results = [];

        const {
            base,
        } = this.state

        let newBlocks = base.slice()

        if (slug === '*') {
            results = base
        } else {
            results = newBlocks.filter(b => b.category === slug)
        }

        this.filterHeightToggle()

        /**
         * Have to destroy flickity first
         * then reset the slides
         *
         * If set state first, flickity errors as
         * the DOM elements are removed and re-inserted
         */
        this.flickity.destroy()

        this.setState({
            blocks: results,
            catSelected: true,
            panelIsOpen: slug === '*' ? false : true
        }, () => {
            this.initFlickity()
        })
    }

    render() {
        const {
            blocks,
            categories,
            sliderRow,
            active
        } = this.state

        const {
            displayCategory
        } = this.props

        return (
            <div className={cx(styles.layout, {
                [styles.gridSpace]: displayCategory
            })}>
                {this.props.sectionTitle &&
                    <SectionHeader text={this.props.sectionTitle} classes='wrapper' />
                }

                <div className={styles.grid}>
                    {blocks && blocks.map((b, i) => {
                        return (
                            <div
                                className={styles.col}
                                onClick={() => this.blockHandler(b, i)}
                                key={b.id}
                            >
                                <ContentBlock
                                    key={b.id}
                                    inGrid={true}
                                    {...b}
                                />
                            </div>
                        )
                    })}

                    <div
                        className={cx(styles.full, styles.wrapper, {
                            [styles.hidden]: !this.state.panelIsOpen,
                            [styles.block]: this.state.panelIsOpen
                        })}
                        style={{
                            'gridRow': sliderRow + 1,
                        }}
                    >
                        <div className={styles.slider} ref={this.slider}>
                            {blocks.map((s, i) => {
                                return (
                                    <ContentPanel key={i} currentSlide={active} slideIndex={i} {...s} />
                                )
                            })}
                        </div>
                    </div>
                </div>


                {displayCategory &&
                    <FilterPanel
                        categories={categories}
                        isOpen={this.state.filterOpen}
                        refHandler={(el) => this.filterPanel = el}
                        selectionHandler={this.filterContentSelection}
                        panelHandler={this.filterHeightToggle}
                        resetHandler={this.filterReset}
                    />
                }

            </div>
        )
    }
}

export default ContentGrid
