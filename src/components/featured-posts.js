import React, { Component } from 'react'
import { Link } from 'gatsby'
import MediaQuery from 'react-responsive'

import FlickitySlider from './flickity-slider'
import MobileContentGrid from './MobileContentGrid'
import styles from './featured-posts.module.css'


const FeaturedPosts = (props) => {
    const { posts } = props

    return (
        <div className={styles.posts}>
            <MediaQuery minWidth={768}>
              <FlickitySlider type="posts" slides={posts} />
            </MediaQuery>
            <MediaQuery maxWidth={768}>
              <MobileContentGrid contentBlocks={posts} />
            </MediaQuery>
        </div>
    )
}

export default FeaturedPosts
