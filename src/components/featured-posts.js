import React, { Component } from 'react'
import { Link } from 'gatsby'

import styles from './featured-posts.module.css'

const FeaturedPosts = (props) => {
    const { posts } = props

    return (
        <div className={styles.posts}>
            {posts && posts.map((p, i) => {
                return (
                    <div className={styles.article} key={p.id}>
                        <div className={styles.inner}>
                            <div className={styles.content}>
                                <h1 className={styles.title}>{p.title}</h1>
                                <Link className={styles.link} to={`blog#${p.slug}`}>Read More</Link>
                            </div>
                            <div className={styles.media} style={{
                                backgroundImage: `url(${p.heroImage.fluid.src})`
                            }}>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FeaturedPosts