import React, { Component, createRef } from 'react';
import Flickity from 'flickity'
import { Image, Link } from 'gatsby'
import '../../node_modules/flickity/css/flickity.css'
import styles from '../components/flickity-slider.module.css'

class FlickitySlider extends Component {
  constructor(props) {
    super(props)
    
    this.flick = createRef()
  }
  
  componentDidMount() {
    console.log(this.props)
    const flkty = new Flickity( this.flick.current, {
      cellAlign: 'left',
      contain: true
    });
  }
  
  render() {
    const { slides } = this.props
    return(
      <div className={styles.slider} ref={this.flick}>
        {slides && slides.map((s) => {
          return (
            <div key={s.id} className={styles.slide}>
              <div className={styles.content}>
                <h3>{s.title}</h3>  
                <Link className={styles.link} to={`blog#${s.slug}`}>Read More</Link>
              </div>
              <div className={styles.media}>
                {s.heroImage && 
                  <img src={s.heroImage.fluid.src}/>
                }
              </div>
            
            </div>
          )
        })}
      </div>
    )
  }
}

export default FlickitySlider;