import React, { Component, createRef } from 'react'
import uniq from 'lodash.uniq'
import uniqBy from 'lodash.uniqby'
import cx from 'classnames'
import scrollIntoView from 'scroll-into-view-if-needed'
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed'
import ContentBlock from './ContentBlock'
import ContentPanel from './content-panel'
import SectionHeader from './section-header'
import FilterPanel from './filter-panel'

import '../../node_modules/flickity/dist/flickity.css'
import styles from './contentGrid.module.css'

const Flickity =
  typeof window !== 'undefined' ? require('flickity') : () => null

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
    this.flickity = null
    this.mq = null
    this.matches = false
    this.innerPanel = null
    this.flickOptions = {
      cellAlign: 'left',
      contain: true,
      draggable: false,
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
      showAll: false,
      isUnfixed: false,
    }
  }

  handleSticky = () => {
    if (
      window &&
      this.filterPanel &&
      typeof this.filterPanel.getBoundingClientRect === 'function'
    ) {
      const filterPanel = this.filterPanel.getBoundingClientRect()

      const unfixed = filterPanel.y + filterPanel.height < window.innerHeight

      if (this.state.isUnfixed !== unfixed) {
        this.setState({ isUnfixed: unfixed })
        // this.contentPanel.current.style.paddingBottom = unfixed ? '45px' : '0'
        this.filterPanel.style.position = unfixed ? 'absolute' : 'sticky'
      }
    }
  }

  componentDidMount() {
    const { contentBlocks } = this.props
    const sluggedBlocks = contentBlocks.slice()

    this.setState(
      {
        base: sluggedBlocks,
        blocks: sluggedBlocks,
      },
      () => {
        this.initFlickity()
      }
    )

    this.initCategories(sluggedBlocks)

    document.addEventListener('scroll', this.handleSticky)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleSticky)
  }

  initFlickity = () => {
    this.flickity = new Flickity(this.slider.current, this.flickOptions)

    Array.from(
      this.slider.current.querySelectorAll('.flickity-button'),
      b => (b.style.display = 'none')
    )
    this.slider.current.querySelector('.flickity-page-dots').style.display =
      'none'

    this.setDisabledStates()
    this.flickityChangeEvent()
  }

  setDisabledStates = () => {
    this.setState({
      isFirst: this.flickity.selectedIndex === 0,
      isLast: this.flickity.selectedIndex === this.flickity.cells.length - 1,
    })
  }

  flickityChangeEvent = () => {
    this.flickity.on('change', e => {
      this.setDisabledStates()
    })
  }

  getCurrentIndex = () => {
    const blocks = this.state.blocks
    const current = this.state.activeSlide
    return blocks.findIndex(b => b.id === current.id)
  }

  insertSlider = currentRow => {
    const COL_COUNT = 4
    const nextRow = Math.ceil((this.getCurrentIndex() + 1) / COL_COUNT)

    this.setState(
      {
        sliderRow: nextRow,
      },
      () => {
        this.flickity.select(this.getCurrentIndex())
        this.flickity.resize()
        if (currentRow === nextRow) return
        this.flickityIntoView()
      }
    )

    this.handleSticky()
  }

  blockHandler = (block, index) => {
    const { panelIsOpen, sliderRow } = this.state

    const currentSlide = this.state.activeSlide
    const isSameSlide = block === currentSlide

    if (isSameSlide && panelIsOpen) {
      this.closePanel()
    } else if (!isSameSlide && panelIsOpen) {
      this.openPanel()
    } else if (!panelIsOpen) {
      this.openPanel()
    }

    this.setState(
      {
        activeSlide: block,
      },
      () => {
        this.insertSlider(sliderRow, block, index)
      }
    )

    this.handleSticky()
  }

  pauseVideos = () => {
    var videos = document.getElementsByTagName('video')

    for (let video of videos) {
      if (!video.classList.contains('video-player')) continue
      video.pause()
    }
  }

  closePanel = () => {
    this.setState(
      {
        panelIsOpen: false,
      },
      () => {
        this.contentPanel.current.style.height = `0`

        this.pauseVideos()

        setTimeout(() => {
          this.contentPanel.current.style.display = `none`
        }, 600)
      }
    )

    this.handleSticky()
  }

  openPanel = () => {
    this.setState(
      {
        panelIsOpen: true,
      },
      () => {
        this.contentPanel.current.style.display = `block`

        this.pauseVideos()

        setTimeout(() => {
          const panel = this.contentPanel.current
          const inner = panel.querySelector('[data-panel-inner="true"]')
          this.contentPanel.current.style.height = `${inner.scrollHeight}px`
        }, 0)
      }
    )

    this.handleSticky()
  }

  flickityIntoView = () => {
    smoothScrollIntoView(this.contentPanel.current, {
      block: 'start',
      behavior: 'smooth',
      duration: 100,
    })
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

  loadMore = () => this.setState({ showAll: true })

  filterHeightToggle = () => {
    const cs = this.state.filterOpen
    const openHeight = this.filterPanel.scrollHeight + 45

    if (this.state.filterOpen) {
      this.filterPanel.style.height = '45px'
    } else {
      this.filterPanel.style.height = `${openHeight}px`
    }

    this.setState({
      filterOpen: !cs,
    })
  }

  filterReset = () => {
    const { base, categories } = this.state

    this.setState({
      activeSlide: -1,
      panelIsOpen: false,
      catSelected: [],
      blocks: base,
    })
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

    this.filterHeightToggle()
    /**
     * Have to destroy flickity first
     * then reset the slides
     *
     * If set state first, flickity errors as
     * the DOM elements are removed and re-inserted
     */
    this.flickity.destroy()
    this.setState(
      {
        blocks: results,
        panelIsOpen: false,
        catSelected: this.activeSlugs,
      },
      () => {
        this.initFlickity()
        this.closePanel()
      }
    )
  }

  isLastSlide = () => (this.flickity.selectedIndex === 0 ? 'disabled' : '')

  handlePrev = () => {
    this.flickity.previous()
    this.setState(
      {
        activeSlide: this.state.blocks[this.flickity.selectedIndex],
      },
      this.pauseVideos()
    )
  }

  handleNext = () => {
    this.flickity.next()
    this.setState(
      {
        activeSlide: this.state.blocks[this.flickity.selectedIndex],
      },
      this.pauseVideos()
    )
  }

  render() {
    const {
      blocks,
      categories,
      sliderRow,
      active,
      activeSlide,
      catSelected,
      panelIsOpen,
    } = this.state
    const { displayCategory, identifier } = this.props

    const visibleBlocks = this.state.showAll ? blocks : blocks.slice(0, 16)

    return (
      <div
        ref="wrapper"
        className={cx(styles.layout, {
          [styles.gridSpace]: displayCategory,
        })}
      >
        <div className={styles.scrollOffset} id={identifier} />
        {this.props.sectionTitle && (
          <SectionHeader text={this.props.sectionTitle} classes="wrapper" />
        )}

        <div
          className={cx(styles.gridWrapper, {
            [styles.open]: panelIsOpen,
          })}
        >
          <div className={styles.grid}>
            {visibleBlocks &&
              visibleBlocks.map((b, i) => {
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
                gridRow: sliderRow + 1,
              }}
              ref={this.contentPanel}
            >
              <button
                className={cx(styles.closeBtn)}
                onClick={this.closePanel}
              />

              <div className={styles.slider} ref={this.slider}>
                {blocks &&
                  blocks.map((b, i) => {
                    return (
                      <ContentPanel
                        key={i}
                        isFilterable={displayCategory}
                        currentSlide={activeSlide.id === b.id}
                        slideIndex={i}
                        whiteBg
                        {...b}
                      />
                    )
                  })}
              </div>

              <div className={styles.pagination}>
                <button
                  className={cx(styles.prev, styles.btn)}
                  disabled={this.state.isFirst}
                  onClick={this.handlePrev}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="27"
                  >
                    <g fillRule="evenodd">
                      <path d="M15.071 24.657l-1.414 1.414L.929 13.343l1.414-1.414z"></path>
                      <path d="M13.592.55l1.415 1.413L2.279 14.691.865 13.277z"></path>
                    </g>
                  </svg>
                </button>

                <button
                  className={cx(styles.next, styles.btn)}
                  disabled={this.state.isLast}
                  onClick={this.handleNext}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="27"
                  >
                    <g fillRule="evenodd">
                      <path d="M.929 2.343L2.343.93l12.728 12.728-1.414 1.414z"></path>
                      <path d="M2.408 26.45L.993 25.038 13.721 12.31l1.414 1.414z"></path>
                    </g>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {displayCategory && (
            <FilterPanel
              categories={categories}
              isOpen={this.state.filterOpen}
              selected={catSelected}
              refHandler={el => (this.filterPanel = el)}
              selectionHandler={this.filterContentSelection}
              panelHandler={
                this.state.isUnfixed && !this.state.showAll
                  ? this.loadMore
                  : this.filterHeightToggle
              }
              resetHandler={this.filterReset}
              text={
                this.state.isUnfixed && !this.state.showAll
                  ? 'Load More'
                  : 'Filter'
              }
            />
          )}
        </div>
      </div>
    )
  }
}

export default ContentGrid
