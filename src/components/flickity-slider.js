// if (typeof window !== `undefined`) {
//   const Flickity = require('flickity');
// }

import React, { Component, createRef } from 'react';
import { Image, Link } from 'gatsby'
import '../../node_modules/flickity/dist/flickity.css'
import styles from '../components/flickity-slider.module.css'
import cx from 'classnames'
import ContentBlock from '../components/ContentBlock'
import ContentPanel from '../components/content-panel'
import ContentPanelMobile from '../components/content-panel-mobile'
import Flickity from 'flickity'

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
    this.flkty = null
    this.state = {
      slides: [],
      active: 0
    }
  }
  
  componentDidMount() {
    
    
    this.setState({
      slides: this.props.posts ? this.props.posts : this.props.slides
    }, () => {

      this.initFlickity()
    })
  }
  
  initFlickity = () => {
    this.flickity = new Flickity(this.slider.current, {
      cellAlign: 'left',
      contain: true,
      draggable: false
    })
        
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
      this.setState({active: e})
    })
  }
  
  render() {
    return (
      <div className={styles.wrapper}>
        
        <div className={styles.slider} ref={this.slider}>
          {this.state.slides && this.state.slides.map((s, i) => {
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
        
        <div className={styles.pagination}>
          <button 
            className={cx(styles.prev, styles.btn)}
            disabled={this.state.isFirst}
            onClick={() => {
                this.flickity.previous()
            }}>Prev</button>
            
            <button 
              className={cx(styles.next, styles.btn)}
              disabled={this.state.isLast}
              onClick={() => {
                  this.flickity.next()
              }}>Next</button>
        </div>
      </div> 
    )
  }
}

export default FlickitySlider;