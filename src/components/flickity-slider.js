import '../../node_modules/flickity/dist/flickity.css'

import { Image, Link } from 'gatsby'
import React, { Component, createRef } from 'react'

import ContentPanel from '../components/content-panel'
import cx from 'classnames'
import styles from '../components/flickity-slider.module.css'

const Flickity =
  typeof window !== 'undefined' ? require('flickity') : () => null

/**
 *
 * May Need to have a separate "Featured Image" field for mobile.
 * Desktop can show whatever media content is on the right side as necessary.
 * May need to also have a radio select options for "type" of Slide/Card
 *
 */

class FlickitySlider extends Component {
  constructor(props) {
    super(props)

    this.slider = createRef()
    this.flickity = null
    this.state = {
      slides: [],
      active: {},
      index: 0,
      isFirst: true,
      isLast: false,
    }
  }

  componentDidMount() {
    const slides = this.props.posts ? this.props.posts : this.props.slides
    this.setState(
      {
        slides: slides,
        active: slides[0],
      },
      () => {
        this.initFlickity()
      }
    )
  }

  initFlickity = () => {
    this.flickity = new Flickity(this.slider.current, {
      cellAlign: 'left',
      contain: true,
      draggable: this.props.draggable ? true : false,
      dragThreshold: this.props.dragThreshold ? this.props.dragThreshold : 3,
      selectedAttraction: 0.01,
      friction: 0.15,
    })

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
      this.setState({
        active: this.state.slides[this.flickity.selectedIndex],
        index: e,
      })
    })
  }

  render() {
    const { slides, active, index } = this.state
    const { isFeatured } = this.props

    return (
      <div
        className={cx(styles.wrapper, {
          [styles.isFeatured]: isFeatured,
        })}
      >
        {Flickity && (
          <>
            {slides && (
              <div className={cx(styles.nav)}>
                {slides.map((s, i) => {
                  return (
                    <div
                      className={cx(styles.dot, {
                        [styles.activeDot]: i === index,
                      })}
                      key={s.id + 1}
                    ></div>
                  )
                })}
              </div>
            )}
            <div className={styles.slider} ref={this.slider}>
              {slides &&
                slides.map((s, i) => {
                  if (s.type !== 'panel') {
                    return (
                      <div className={cx(styles.slide)} key={s.id}>
                        <ContentPanel
                          panelIsOpen={true}
                          slideIndex={i}
                          currentSlide={active}
                          isFeatured={true}
                          {...s}
                        />
                      </div>
                    )
                  }
                })}
            </div>
            <div className={styles.pagination}>
              <button
                className={cx(styles.prev, styles.btn)}
                disabled={this.state.isFirst}
                onClick={() => {
                  if (!this.flickity) return
                  this.flickity.previous()
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="27">
                  <g fillRule="evenodd">
                    <path d="M15.071 24.657l-1.414 1.414L.929 13.343l1.414-1.414z"></path>
                    <path d="M13.592.55l1.415 1.413L2.279 14.691.865 13.277z"></path>
                  </g>
                </svg>
              </button>
              <button
                className={cx(styles.next, styles.btn)}
                disabled={this.state.isLast}
                onClick={() => {
                  if (!this.flickity) return
                  this.flickity.next()
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="27">
                  <g fillRule="evenodd">
                    <path d="M.929 2.343L2.343.93l12.728 12.728-1.414 1.414z"></path>
                    <path d="M2.408 26.45L.993 25.038 13.721 12.31l1.414 1.414z"></path>
                  </g>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default FlickitySlider
