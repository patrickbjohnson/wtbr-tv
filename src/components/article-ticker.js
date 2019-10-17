import React from 'react';

import styles from './article-ticker.module.css'

import Ticker from 'react-ticker'

export default ({textString}) => (
  <div className={styles.ticker}>
  <Ticker>
      {({ index }) => (
        <>
        {(textString) &&
          <span className={styles.item} >{textString}</span>
        }
        </>
      )}
  </Ticker>
  </div>
)