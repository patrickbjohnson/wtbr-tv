import React, { Component } from 'react'
import FlickitySlider from './flickity-slider'
import styles from './featured-posts.module.css'

const FeaturedPosts = (props) => {
    const { posts } = props
    return (
      <div className={styles.posts}>
        <FlickitySlider 
          type="posts" 
          slides={posts} 
          draggable
          isFeatured={true}
        />
      </div>
    )
}

export default FeaturedPosts
