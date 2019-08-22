if (typeof window !== `undefined`) {
  const Flickity = require('flickity');
}

import React, { Component, createRef } from 'react';
import { Image, Link } from 'gatsby'
import '../../node_modules/flickity/dist/flickity.css'
import styles from '../components/flickity-slider.module.css'
import cx from 'classnames'
import ContentBlock from './ContentBlock'
import ContentPanel from './content-panel'
import ContentPanelMobile from './content-panel-mobile'

/**
 * 
 * May Need to have a separate "Featured Image" field for mobile. 
 * Desktop can show whatever media content is on the right side as necessary.
 * May need to also have a radio select options for "type" of Slide/Card
 * 
 */

class FlickityGridSlider extends Component {
  constructor(props) {
    super(props)
    
    this.flick = createRef()
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
      this.flkty = new Flickity( this.flick.current, {
        cellAlign: 'left',
        contain: true,
        draggable: false
      });
      
      this.flkty.on('change', (i) => {
        this.setState({
          active: i
        })
      })
    })
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps, prevState, snapshot)
  }
  
  render() {
    return (
      <div className={styles.slider} ref={this.flick}>
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
    )
  }
}

export default FlickityGridSlider;