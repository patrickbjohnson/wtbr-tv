import React, { Component, createRef } from 'react'
import Img from 'gatsby-image'
import cx from 'classnames'
import Player from '@vimeo/player'
import styles from './home-hero.module.css'

class HomeHero extends Component {
    constructor(props) {
        super(props)
        this.api = null
        this.video = createRef()
        this.player = null
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
            videoHeroTitle
        } = this.props

        return (
            <div className={cx(styles.block, classNames)}>
                <div className={styles.videoWrapper} ref={this.video} />
                <div className={styles.section} >
                    <div className={styles.content}>
                        <p className={styles.title}>{this.props.videoHeroTitle}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeHero
