import React, { Component } from 'react'
import { Link } from 'gatsby'
import FlickitySlider from './flickity-slider'
import styles from './featured-posts.module.css'

  
const FeaturedPosts = (props) => {
    const { posts } = props

    return (
        <div className={styles.posts}>
            <FlickitySlider type="posts" slides={posts} />
        </div>
    )
}

export default FeaturedPosts