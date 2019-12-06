import React, { Component, createRef } from 'react'
import { Image, Link } from 'gatsby'
import cx from 'classnames'
import '../../node_modules/flickity/dist/flickity.css'
import styles from '../components/flickity-slider.module.css'
import ContentPanel from '../components/content-panel'

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
      active: 0,
      isFirst: true,
      isLast: false,
    }
  }

  componentDidMount() {
    this.setState(
      {
        slides: this.props.posts ? this.props.posts : this.props.slides,
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
      this.setState({ active: e })
    })
  }

  render() {
    const { slides, active } = this.state

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
                        [styles.activeDot]: i === active,
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
                          {...s}
                          currentSlide={active}
                          slideIndex={i}
                          isFeatured
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
