import React from 'react'
import SectionHeader from './section-header'
import Img from 'gatsby-image'

import styles from './client-list.module.css'

export default function ClientList(props) {
  
  const {
    title,
    logos
  } = props
  

  return (
  <div className={styles.section}>
    <SectionHeader text={props.title} classes='wrapper' />
    <div class={styles.grid}>
      
      {logos.length > 0 && 
        logos.map((l) => {
          return (
            <div className={styles.col} key={l.id}>
              <Img className={styles.image} alt={l.title} fluid={l.fluid} />
            </div>
          )
        })
      }
    </div>
  </div>
  )
}