import React, { Component } from 'react';

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
                                <h1 className={styles.title}>Post Title</h1>
                                <a className={styles.link} href="#">Read More</a>
                            </div>
                            <div className={styles.media} style={{
                                backgroundImage: `url(http://placehold.it/400x300)`
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