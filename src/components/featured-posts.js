import React, { Component } from 'react'
import FlickitySlider from './flickity-slider'
import styles from './featured-posts.module.css'

const FeaturedPosts = ({ posts }) => {
  return (
    <div className={styles.posts}>
      <FlickitySlider type="posts" slides={posts} draggable isFeatured={true} />
    </div>
  )
}

export default FeaturedPosts
