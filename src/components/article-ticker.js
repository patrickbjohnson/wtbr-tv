import React from 'react';

import styles from './article-ticker.module.css'

export default ({articles}) => {

  return (
    <div className={styles.ticker}>
      {articles.map(article => {
        return <span className={styles.item}>{article.node.title}</span>
      })}

    </div>
  )
}
