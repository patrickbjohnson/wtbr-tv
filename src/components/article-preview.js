import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.css'

const formatDate = (date) => {
  const d = new Date(date);
  const rawDay = d.getDate();
  const rawMonth = d.getMonth();
  const rawYear = d.getFullYear();

  const day = (rawDay > 10) ? rawDay : "0" + rawDay;
  const month = (rawMonth > 10) ? rawMonth : "0" + rawMonth;
  const year = rawYear.toString().substr(-2)
  return `${day}.${month}.${year}`;
}

export default ({ article }) => {
  const { node } = article
  return (
  <article className={styles.article} id={node.slug}>
    <div className={styles.meta}>
      <h2 className={styles.title}>{node.title}</h2>
      <small>{formatDate(node.publishDate)}</small>
    </div>
    <Img className={styles.image} alt={node.title} fluid={node.heroImage.fluid} />
    <div className={styles.content}>
    <div dangerouslySetInnerHTML={{
      __html: node.body.childMarkdownRemark.html
    }}></div>
    </div>

  </article>
)}
