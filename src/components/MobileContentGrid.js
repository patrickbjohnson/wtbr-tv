import React, { Component, createRef } from 'react'
import uniq from 'lodash.uniq'
import uniqBy from 'lodash.uniqby'
import cx from 'classnames'
import ContentBlock from './ContentBlock'
import ContentPanel from './content-panel'
import SectionHeader from './section-header'
import scrollIntoView from 'scroll-into-view-if-needed'
import smoothScrollIntoView from 'smooth-scroll-into-view-if-needed'

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
      panelIsOpen: false,
      isFirst: false,
      isLast: false,
      showAll: false,
      isUnfixed: false,
    }
  }

  setRef = ref => {
    this.mobileContentRef.push(ref)
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
        this.contentPanel.current.style.paddingBottom = unfixed ? '45px' : '0'
        this.filterPanel.style.position = unfixed ? 'absolute' : 'sticky'
      }
    }
  }

  componentDidMount() {
    const { contentBlocks } = this.props

    const sluggedBlocks = contentBlocks.slice()

    this.setState({
      base: sluggedBlocks,
      blocks: sluggedBlocks,
    })

    this.initCategories(sluggedBlocks)

    document.addEventListener('scroll', this.handleSticky)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleSticky)
  }

  getCurrentIndex = () => {
    const blocks = this.state.blocks
    const current = this.state.activeSlide
    return blocks.findIndex(b => b.id === current.id)
  }

  blockHandler = (block, index, evt) => {
    console.log('block handlers!')
    const panel = this.mobileContentRef[index]
    const { panelIsOpen } = this.state

    const isSameSlide = block === this.state.activeSlide

    if (isSameSlide && panelIsOpen) {
      this.closePanel(panel)
    } else if (!isSameSlide && panelIsOpen) {
      this.openPanel(panel)
    } else if (!panelIsOpen) {
      this.openPanel(panel)
    }

    this.setState({
      activeSlide: block,
    })

    // this.handleSticky()
  }

  pauseVideos = () => {
    var videos = document.getElementsByTagName('video')
    for (let video of videos) {
      video.pause()
    }
  }

  closePanel = panel => {
    this.pauseVideos()
    panel.style.height = 0

    this.setState({
      panelIsOpen: false,
    })

    // this.handleSticky()
  }

  openPanel = panel => {
    this.closeAllPanels()
    this.pauseVideos()
    panel.style.height = `${panel.scrollHeight}px`

    this.setState({
      panelIsOpen: true,
    })

    // this.handleSticky()
  }

  closeAllPanels = () => {
    this.mobileContentRef.map(panel => (panel.style.height = 0))
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
    const openHeight = this.filterPanel.scrollHeight

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
    this.setState({
      activeSlide: -1,
      panelIsOpen: false,
      catSelected: [],
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

    const results = shouldResetResults
      ? base
      : base.filter(b =>
          b.categoryTags.some(r => this.activeSlugs.indexOf(slugify(r)) > -1)
        )
    this.filterHeightToggle()
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
      () => {
        this.closePanel()
      }
    )
  }

  showLoadMore = () => {
    return this.state.isUnfixed && !this.state.showAll
  }

  // constructor(props) {
  //     super(props)
  //     this.filterPanel = createRef()
  //     this.initalBlocks = []
  //     this.activeSlugs = []
  //     this.state = {
  //         base: props.contentBlocks,
  //         blocks: props.contentBlocks,
  //         categories: [],
  //         filterOpen: false,
  //         catSelected: [],
  //         sliderRow: -1,
  //         active: 0,
  //         panelIsOpen: false,
  //         isFirst: false,
  //         isLast: false
  //     }
  // }

  // componentDidMount() {
  //     this.initCategories(this.props.contentBlocks)
  // }

  // getCurrentIndex = () => {
  //     const blocks = this.state.base
  //     const current = this.state.activeSlide
  //     return blocks.findIndex((b) => b.id === current.id)
  // }

  // insertBlock = () => {
  //   this.setState({
  //     sliderRow: this.getCurrentIndex() + 1
  //   })
  // }

  // blockHandler = (block, index) => {
  //     const {
  //       panelIsOpen,
  //       sliderRow
  //     } = this.state

  //     const currentSlide = this.state.activeSlide
  //     const isSameSlide = block === currentSlide

  //     if (isSameSlide && panelIsOpen)  {
  //       this.closePanel()
  //     } else if (!isSameSlide && panelIsOpen) {
  //       this.openPanel()
  //     } else if (!panelIsOpen) {
  //       this.openPanel()
  //     }

  //     this.setState({
  //       activeSlide: block,
  //     }, () => {
  //       this.insertSlider(sliderRow, block, index)
  //     })

  //     this.handleSticky()
  //   }

  // sluggedCategories = (cat) => {
  //     return cat ? cat.toLowerCase().replace(/\s+/g, '-') : false
  // }

  // initCategories = (blocks) => {
  //     if (!this.props.displayCategory) return;

  //     const cats = blocks.map((block) => {
  //       const color = block.categoryColor
  //       const cs = flatten(block.categoryTags);

  //       return cs.map((cat) => {
  //         return {
  //           title: cat,
  //           color: color,
  //           slug: slugify(cat)
  //         }
  //       })
  //     })

  //     this.setState({
  //       categories: uniqBy(flatten(cats), 'slug'),
  //     })
  // }

  // filterHeightToggle = () => {
  //     const cs = this.state.filterOpen
  //     const openHeight = this.filterPanel.scrollHeight
  //     const PADDING_BUFFER = 45

  //     if (this.state.filterOpen) {
  //         this.filterPanel.style.height = `0`
  //     } else {
  //         this.filterPanel.style.height = `${openHeight - PADDING_BUFFER}px`
  //     }

  //     this.setState({
  //         filterOpen: !cs
  //     })
  // }

  // filterReset = () => {
  //     this.setState({
  //         activeSlide: -1,
  //         panelIsOpen: false,
  //         catSelected: []
  //     })
  // }

  // filterContentSelection = (slug) => {
  //     const {
  //         base,
  //     } = this.state

  //     const slugIndex = this.activeSlugs.indexOf(slug);
  //     const shouldResetResults = slug === '*'

  //     if (shouldResetResults) {
  //         this.activeSlugs = []
  //     } else if (slugIndex > -1) {
  //         this.activeSlugs.splice(slugIndex, 1)
  //     } else {
  //         this.activeSlugs.push(slugify(slug))
  //     }

  //     this.activeSlugs = uniq(this.activeSlugs)

  //     const results = shouldResetResults ? base : base.filter(b => b.categoryTags.some((r) => this.activeSlugs.indexOf(slugify(r)) > -1));

  //     this.filterHeightToggle()

  //     this.setState({
  //         blocks: results,
  //         catSelected: this.activeSlugs,
  //         panelIsOpen: slug === '*' ? false : true
  //     })
  // }

  render() {
    const {
      blocks,
      categories,
      sliderRow,
      activeSlide,
      catSelected,
      panelIsOpen,
    } = this.state

    const { displayCategory } = this.props

    return (
      <div
        className={cx(styles.layout, {
          [styles.gridSpace]: displayCategory,
        })}
      >
        {this.props.sectionTitle && (
          <SectionHeader text={this.props.sectionTitle} classes="wrapper" />
        )}

        <div className={styles.grid}>
          {blocks &&
            blocks.map((b, i) => (
              <div
                className={styles.col}
                onClick={e => this.blockHandler(b, i, e)}
                key={b.id}
              >
                <ContentBlock key={b.id} inGrid={true} {...b} />
                <div
                  ref={this.setRef}
                  className={styles.mobileContentDisplay}
                  data-content="true"
                >
                  <ContentPanel
                    key={0}
                    currentSlide={b}
                    slideIndex={0}
                    inGrid={false}
                    whiteBg={true}
                    {...b}
                  />
                </div>
              </div>
            ))}

          {/* <div
            className={cx(styles.full, styles.wrapper, {
              [styles.hidden]: !this.state.panelIsOpen,
              [styles.block]: this.state.panelIsOpen,
              [styles.fullHeight]: this.state.panelIsOpen,
            })}
            style={{
              gridRow: sliderRow + 1,
            }}
            ref={this.contentPanel}
          >
            <div className={styles.slider}>
              <ContentPanel
                key={0}
                currentSlide={activeSlide}
                slideIndex={0}
                isFilterable={true}
                {...activeSlide}
              />
            </div>
          </div> */}
        </div>

        {/* {displayCategory && (
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
            text={this.showLoadMore() ? 'Load More' : 'Filter'}
          />
        )} */}
      </div>
    )
  }
}

export default ContentGrid
