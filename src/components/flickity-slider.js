import React, { Component, createRef } from 'react';

import { Image, Link } from 'gatsby'
import '../../node_modules/flickity/css/flickity.css'
import styles from '../components/flickity-slider.module.css'
import cx from 'classnames'

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
    
    this.flick = createRef()
    this.flkty = null
    this.state = {
      slides: [],
      active: 0
    }
  }
  
  componentDidMount() {    
    const Flickity  = require('flickity')

    this.flkty = new Flickity( this.flick.current, {
      cellAlign: 'left',
      contain: true
    });
    
    this.flkty.on('change', (i) => {
      this.setState({
        active: i
      })
    })
  }
  
  render() {
    const { slides } = this.props
    
    return(
      <div className={styles.slider} ref={this.flick}>
        {slides && slides.map((s) => {
          return (
            <div key={s.id} className={styles.slide}>
              <div className={styles.media}>
                {s.heroImage && 
                  <img src={s.heroImage.fluid.src}/>
                }
              </div>
              <div className={styles.content}>
                <div className={styles.nav}>
                  {(slides && this.flkty) && slides.map((s, i) => {
                    console.log(this.flkty  )
                    return (<span key={s.id} className={cx(styles.dot, {
                      [styles.activeDot]: this.state.active === i
                    })}></span>)
                  })}
                </div>
                <h3>{s.title}</h3> 
                <Link className={styles.link} to={`blog#${s.slug}`}>Read More</Link>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default FlickitySlider;