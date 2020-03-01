import React, { Component, createRef } from 'react'
import uniq from 'lodash.uniq'
import uniqBy from 'lodash.uniqby'
import cx from 'classnames'
import ContentBlock from './ContentBlock'
import ContentPanel from './content-panel'
import MobileContentPanel from './MobileContentPanel'
import SectionHeader from './section-header'
import scrollIntoView from 'scroll-into-view-if-needed'
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed'
import throttle from 'lodash.throttle'

import FilterPanel from './filter-panel'

import styles from './contentGrid.module.css'

const flatten = arr => {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    )
  }, [])
}

const slugify = string => {
  const a =
    'àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
  const b =
    'aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
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
    this.mq = null
    this.matches = false
    this.mobileContentRef = []

    this.state = {
      base: [],
      blocks: [],
      categories: [],
      catSelected: [],
      filterOpen: false,
      sliderRow: -1,
      active: 0,
      activeSlide: {},
      isFirst: false,
      isLast: false,
      showAll: false,
      isUnfixed: false,
    }
  }
  componentDidMount() {
    const { contentBlocks } = this.props

    const sluggedBlocks = contentBlocks.slice()

    this.setState({
      base: sluggedBlocks,
      blocks: sluggedBlocks,
      viewableBlocks: sluggedBlocks.slice(0, 4),
    })

    this.initCategories(sluggedBlocks)

    document.addEventListener(
      'scroll',
      throttle(e => {
        this.handleSticky()
      }, 250)
    )
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleSticky)
  }

  handleSticky = () => {
    if (
      window &&
      this.filterPanel &&
      typeof this.filterPanel.getBoundingClientRect === 'function'
    ) {
      const parent = this.filterPanel.parentElement.getBoundingClientRect()
      const filterPanel = this.filterPanel.getBoundingClientRect()
      const unfixed = filterPanel.y + filterPanel.height < parent.height

      if (this.state.isUnfixed !== unfixed) {
        this.setState({ isUnfixed: unfixed })
      }
    }
  }

  blockHandler = (block, index, evt) => {
    this.pauseVideos()

    this.setState({
      activeSlide: block,
    })
  }

  pauseVideos = () => {
    var videos = document.getElementsByTagName('video')
    for (let video of videos) {
      video.pause()
    }
  }

  initCategories = blocks => {
    let cats = blocks.map(block => {
      if (!block.categories) return
      return block.categories.map(cat => {
        return {
          title: cat.category,
          color: cat.categoryColor,
          slug: slugify(cat.category),
        }
      })
    })

    cats = cats.filter(function(el) {
      return el != null
    })

    this.setState({
      categories: uniqBy(flatten(cats), 'slug'),
    })
  }

  filterHeightToggle = () => {
    const openHeight = this.filterPanel.scrollHeight

    if (this.state.filterOpen) {
      this.filterPanel.style.height = '45px'
    } else {
      this.filterPanel.style.height = `${openHeight}px`
    }

    this.setState(state => this.setState({ filterOpen: !state.filterOpen }))
  }

  filterReset = () => {
    this.setState({
      activeSlide: -1,
      catSelected: [],
    })

    this.filterHeightToggle()

    this.loadMore()
  }

  filterContentSelection = slug => {
    const { base, categories } = this.state
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

    this.filterHeightToggle()

    const results =
      shouldResetResults || this.activeSlugs.length === 0
        ? base
        : base.filter(b => {
            return b.categories
              ? b.categories.some(r => {
                  return this.activeSlugs.indexOf(slugify(r.category)) > -1
                })
              : false
          })
    /**
     * Have to destroy flickity first
     * then reset the slides
     *
     * If set state first, flickity errors as
     * the DOM elements are removed and re-inserted
     */

    this.setState(
      {
        blocks: results,
        panelIsOpen: false,
        catSelected: this.activeSlugs,
      },
      () => this.loadMore()
    )
  }

  showLoadMore = () => {
    return !this.state.showAll
  }

  loadMore = () => this.setState({ showAll: true })

  sluggedCategories = cat => {
    return cat ? cat.toLowerCase().replace(/\s+/g, '-') : false
  }

  render() {
    const {
      blocks,
      categories,
      activeSlide,
      catSelected,
      isLoading,
    } = this.state

    const { displayCategory } = this.props

    const visibleBlocks = this.state.showAll ? blocks : blocks.slice(0, 4)

    return (
      <div
        className={cx(styles.layout, {
          [styles.gridSpace]: displayCategory,
        })}
      >
        {this.props.sectionTitle && (
          <SectionHeader text={this.props.sectionTitle} classes="wrapper" />
        )}

        <div>
          <div className={styles.grid}>
            {visibleBlocks &&
              visibleBlocks.map((b, i) => (
                <div
                  className={styles.col}
                  onClick={e => this.blockHandler(b, i, e)}
                  key={b.id}
                >
                  <ContentBlock
                    key={b.id}
                    inGrid={true}
                    {...b}
                    active={b === activeSlide}
                    showHover={false}
                  />
                  <MobileContentPanel
                    key={b.id}
                    currentSlide={b === activeSlide}
                    {...b}
                  />
                </div>
              ))}
          </div>

          {displayCategory && (
            <FilterPanel
              categories={categories}
              isOpen={this.state.filterOpen}
              selected={catSelected}
              refHandler={el => (this.filterPanel = el)}
              selectionHandler={this.filterContentSelection}
              panelHandler={
                this.showLoadMore() ? this.loadMore : this.filterHeightToggle
              }
              resetHandler={this.filterReset}
              text={!this.state.showAll ? 'Load More' : 'Filter'}
            />
          )}
        </div>
      </div>
    )
  }
}

export default ContentGrid
