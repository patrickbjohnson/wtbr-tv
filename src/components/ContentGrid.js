import React, { Component, createRef } from 'react';
import chunk from 'lodash.chunk'
import uniqBy from 'lodash.uniqby'
import cx from 'classnames'
import ContentBlock from './ContentBlock';
import ContentPanel from './content-panel'
import SectionHeader from './section-header'
import filterPanel from './filter-panel'
import ContentPanelMobile from './content-panel-mobile'

import styles from './contentGrid.module.css'
import FilterPanel from './filter-panel';

class ContentGrid extends Component {
    constructor(props) {
        super(props)
        this.filterPanel = createRef()
        this.flick = createRef()
        this.initalBlocks = []
        this.flkty = null
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
            activeSlide: 0
        }
    }

    sluggedCategories = (cat) => {
        return cat ? cat.toLowerCase().replace(/\s+/g, '-') : false
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
        const Flickity  = require('flickity')
        this.mq = window.matchMedia('(min-width: 768px)');
        this.initalBlocks = this.props.contentBlocks
        this.setState({
            base: this.props.contentBlocks,
            blocks: this.props.contentBlocks,
            filterOpen: false,
            filteredBlocks: this.props.contentBlocks,
        }, () => {
            this.matches = this.mq.matches
            console.log(this.flick)
        })
        
        this.initCategories(this.props.contentBlocks)
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        const Flickity  = require('flickity')
        
        const {
            filteredBlocks
        } = this.state
        
        const shouldUpdate = filteredBlocks.filter((b) => {
            return b.hasOwnProperty('type') && b.type === 'panel'
        })
        
        if (shouldUpdate.length > 0 && this.flick.current) {
            console.log('inside if')
            this.flkty = new Flickity(this.flick.current, {
                cellAlign: 'left',
                contain: true,
                draggable: false
            });
          
            this.flkty.on('change', (i) => {
                this.setState({
                    active: i
                })
            })
        }
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

    blockClickHandler = (block, index) => {
        console.log(block)
        this.setState({
            activeBlock: block
        }, () => {
            this.insertPanel()
            if (!this.flkty) return
            this.flkty.select(index)
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
        const data = this.state.activeBlock
        const panel = {
            type: 'panel',
            id: `panel-${Math.random()}`,
            data
        }

        const newBlocks = [
            ...this.state.base.slice(0, sliceIndex),
            panel,
            ...this.state.base.slice(sliceIndex)
        ]

        this.setState({
            blocks: newBlocks,
            filteredBlocks: newBlocks
        }, () => {
            console.log('insert panels: ', this.state.filteredBlocks)
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
            filteredBlocks: results
        }, () => {
            console.log('results!', this.state.filteredBlocks)
        })
    }
    
    updateCurrentSlideIndex = (index) => {
        console.log(index)
    }

    render() {
        const {
            currentBlock,
            categories,
            filteredBlocks
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
                    {filteredBlocks && filteredBlocks.map((b, i) => {
                        if (b.hasOwnProperty('type') && b.type === 'panel') {
                            return (
                                <div className={cx(styles.col, styles.full)}>
                                    
                                    <div className={styles.slider} ref={this.flick}>
                                        {filteredBlocks && filteredBlocks.map((s, i) => {
                                          if (s.type !== 'panel') {
                                            return (
                                              <div className={styles.slide} key={s.id}>
                                                <ContentPanelMobile {...s} currentSlide={this.state.active} slideIndex={i}/>
                                                <ContentPanel {...s} currentSlide={this.state.active} slideIndex={i}/>
                                              </div>
                                            )            
                                          }
                                        })}
                                      </div>
                                </div>
                            )
                        } else { 
                            return (
                                <div
                                    className={styles.col}
                                    onClick={() => this.blockClickHandler(b, i)}
                                    key={b.id}
                                >
                                    <ContentBlock 
                                        key={b.id}
                                        inGrid={true}
                                        {...b}
                                    />
                                </div>
                            )   
                        }
                    })}
                </div>

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
