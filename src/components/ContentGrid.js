import React, { Component, createRef } from 'react';
import uniq from 'lodash.uniq'
import uniqBy from 'lodash.uniqby'
import cx from 'classnames'
import scrollIntoView from 'scroll-into-view-if-needed'
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed'
import ContentBlock from './ContentBlock';
import ContentPanel from './content-panel'
import SectionHeader from './section-header'
import FilterPanel from './filter-panel';

import '../../node_modules/flickity/dist/flickity.css'
import styles from './contentGrid.module.css'

const Flickity = typeof window !== "undefined" ? require("flickity") : () => null

const flatten = (arr) => {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

const slugify = (string) => {
  const a = 'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
  const b = 'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

class ContentGrid extends Component {
  constructor(props) {
    super(props)
    this.filterPanel = createRef()
    this.slider = createRef()
    this.contentPanel = createRef()
    this.initalBlocks = []
    this.activeSlugs = []
    this.flickity = null
    this.mq = null
    this.matches = false
    this.flickOptions = {
      cellAlign: 'left',
      contain: true,
      draggable: false
    }

    this.state = {
      base: [],
      blocks: [],
      categories: [],
      catSelected: [],
      filterOpen: false,
      sliderRow: -1,
      active: 0,
      activeSlide: {},
      panelIsOpen: false,
      isFirst: false,
      isLast: false,
    }
  }

  componentDidMount() {
    const {
      contentBlocks
    } = this.props

    const sluggedBlocks = contentBlocks.slice()

    this.setState({
      base: sluggedBlocks,
      blocks: sluggedBlocks
    }, () => {
      this.initFlickity()
    });

    this.initCategories(sluggedBlocks)
  }

  initFlickity = () => {
    this.flickity = new Flickity(this.slider.current, this.flickOptions)

    Array.from(this.slider.current.querySelectorAll('.flickity-button'), (b) => b.style.display = 'none')
    this.slider.current.querySelector('.flickity-page-dots').style.display = 'none'

    this.setDisabledStates()
    this.flickityChangeEvent()
  }

  setDisabledStates = () => {
    this.setState({
      isFirst: this.flickity.selectedIndex === 0,
      isLast: this.flickity.selectedIndex === (this.flickity.cells.length - 1)
    })
  }

  flickityChangeEvent = () => {
    this.flickity.on('change', (e) => {
      this.setDisabledStates()
    })
  }

  getCurrentIndex = () => {
    const blocks = this.state.blocks
    const current = this.state.activeSlide
    return blocks.findIndex((b) => b.id === current.id)
  }

  insertSlider = (currentRow) => {
    const COL_COUNT = 4
    const nextRow = Math.ceil((this.getCurrentIndex() + 1) / COL_COUNT)

    this.setState({
      sliderRow: nextRow,
    }, () => {
      this.flickity.select(this.getCurrentIndex())
      this.flickity.resize()
      if (currentRow === nextRow) return
      this.flickityIntoView()
    })
  }

  blockHandler = (block, index) => {
    const {
      panelIsOpen,
      sliderRow
    } = this.state

    const currentSlide = this.state.activeSlide
    const isSameSlide = block === currentSlide

    if (isSameSlide && panelIsOpen)  {
      this.closePanel()
    } else if (!isSameSlide && panelIsOpen) {
      this.openPanel()
    } else if (!panelIsOpen) {
      this.openPanel()
    }

    this.setState({
      activeSlide: block,
    }, () => {
      this.insertSlider(sliderRow, block, index)
    })
  }

  pauseVideos = () => {
    var videos = document.getElementsByTagName("video");
    for (let video of videos) {
        video.pause();
    }
  }

  closePanel = () => {
    this.setState({
      panelIsOpen: false
    }, () => {
      this.contentPanel.current.style.height = `0`

      this.pauseVideos()

      setTimeout(() => {
        this.contentPanel.current.style.display = `none`
      }, 850)
    })
  }

  openPanel = () => {
    this.setState({
      panelIsOpen: true
    }, () => {
      this.contentPanel.current.style.display = `block`

      this.pauseVideos()

      setTimeout(() => {
        this.contentPanel.current.style.height = `675px`
      }, 0)
    })
  }

  flickityIntoView = () => {
    smoothScrollIntoView(this.contentPanel.current, {
      behavior: 'smooth',
      duration: 100
    })
  }

  initCategories = (blocks) => {

    if (!this.props.displayCategory) return;

    const cats = blocks.map((block) => {
      const color = block.categoryColor
      const cs = flatten(block.categoryTags);

      return cs.map((cat) => {
        return {
          title: cat,
          color: color,
          slug: slugify(cat)
        }
      })
    })

    this.setState({
      categories: uniqBy(flatten(cats), 'slug'),
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
      panelIsOpen: false,
      catSelected: []
    })
  }

  filterContentSelection = (slug) => {
    const {
      base,
      categories
    } = this.state

    const slugIndex = this.activeSlugs.indexOf(slug)
    let shouldResetResults = slug === '*'

    if (shouldResetResults || categories.length === this.activeSlugs.length) {
      this.activeSlugs = []
    } else if (slugIndex > -1) {
      this.activeSlugs.splice(slugIndex, 1)
    } else {
      this.activeSlugs.push(slugify(slug))
    }

    this.activeSlugs = uniq(this.activeSlugs)

    if (categories.length === this.activeSlugs.length) {
      shouldResetResults = true
      this.activeSlugs = []
    }

    const results = shouldResetResults ? base : base.filter(b => b.categoryTags.some((r) => this.activeSlugs.indexOf(slugify(r)) > -1));
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
      panelIsOpen: false,
      catSelected: this.activeSlugs,
    }, () => {
      this.initFlickity()
      this.closePanel()
    })
  }

  isLastSlide = () => {
    return this.flickity.selectedIndex === 0 ? 'disabled' : ''
  }

  render() {
    const {
      blocks,
      categories,
      sliderRow,
      active,
      activeSlide,
      catSelected,
      panelIsOpen
    } = this.state

    const {
      displayCategory,
      identifier,
    } = this.props

    return (
      <div ref="wrapper" className={cx(styles.layout, {
        [styles.gridSpace]: displayCategory
      })}>
        <div className={styles.scrollOffset} id={identifier} />
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
                  panelIsOpen={panelIsOpen}
                  key={b.id}
                  active={activeSlide.id === b.id}
                  inGrid={true}
                  {...b}
                />
              </div>
            )
          })}

          <div
            className={cx(styles.full, styles.wrapper, {
              [styles.fullHeight]: this.state.panelIsOpen,
            })}
            style={{
              'gridRow': sliderRow + 1,
            }}
            ref={this.contentPanel}
            >
              <button
              className={cx(styles.closeBtn)}
              onClick={() => this.closePanel()} />
            <div
              className={styles.slider}
              ref={this.slider}
            >
              {blocks && blocks.map((b, i) => {
                return (
                  <ContentPanel
                    key={i}
                    isFilterable={displayCategory}
                    currentSlide={active}
                    slideIndex={i} {...b}
                  />
                )
              })}
            </div>

            <div className={styles.pagination}>
              <button
                className={cx(styles.prev, styles.btn)}
                disabled={this.state.isFirst}
                onClick={() => {
                  this.flickity.previous()
                  this.setState({
                    activeSlide: blocks[this.flickity.selectedIndex]
                  })
                }}>Prev</button>

              <button
                className={cx(styles.next, styles.btn)}
                disabled={this.state.isLast}
                onClick={() => {
                  this.flickity.next()
                  this.setState({
                    activeSlide: blocks[this.flickity.selectedIndex]
                  })
                }}>Next</button>
            </div>
          </div>
        </div>

        {displayCategory &&
          <FilterPanel
            categories={categories}
            isOpen={this.state.filterOpen}
            selected={catSelected}
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
