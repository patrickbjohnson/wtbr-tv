import React from 'react';

import styles from './article-ticker.module.css'

import Ticker from 'react-ticker'

export default ({articles}) => (
  <div className={styles.ticker}>
  <Ticker>
      {({ index }) => (
        <>
        {articles.map((article, i) => {
          return <span className={styles.item} key={article.node.id}>{article.node.title}</span>
        })}
        </>
      )}
  </Ticker>
  </div>
)