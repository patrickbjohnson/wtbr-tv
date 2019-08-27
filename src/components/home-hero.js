import React, { Component, createRef } from 'react'
import Img from 'gatsby-image'
import cx from 'classnames'
import Player from '@vimeo/player'
import styles from './home-hero.module.css'


class HomeHero extends Component {
  constructor(props) {
    super(props)
    this.SCROLL_SPEED = 1000
    this.contentRefs = []
    this.api = null
    this.video = createRef()
    this.player = null
    this.state = {
      loading: true,
      isLast: null,
      activePanel: null,
      sections: [
        {
          text: ""
        },
        {
          text: this.props.videoHeroTitle
        }
      ]
    }
  }
    
  componentDidMount() {
    const { videoId } = this.props
      
    this.player = new Player(this.video.current, {
      id: videoId,
      width: '100%',
      autoplay: true,
      title: false,
      muted: true,
      loop: true,
      controls: false,
      background: true,
    });

      
    this.player.ready().then(() => this.setState({loading: false}));
  }

    render() {      
      const {
          classNames,
          image,
          videoHeroTitle,
          videoId
      } = this.props
        
      return (
        <div className={cx(styles.block, classNames)}>
          <div className={styles.videoWrapper}>          
            <div ref={this.video}>
              <Img 
                fluid={image.fluid}
                durationFadeIn={500}
                title={videoHeroTitle}
                alt={videoHeroTitle}
                fadeIn
              />
            </div>
          </div>
          
          {videoHeroTitle && 
            <div className={styles.content}>
              <h2 className={styles.title}>{videoHeroTitle}</h2>
            </div>          
          }
        </div>
      )
    }
}

export default HomeHero