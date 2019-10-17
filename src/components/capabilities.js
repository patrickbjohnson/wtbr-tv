import React from 'react'
import SectionHeader from './section-header'
import Img from 'gatsby-image'

import styles from './capabilities.module.css'
export default function Capabilities (props) {
  const {
    title,
    capabilities
  } = props 
  
  return (
    <div className={styles.section}>
      <SectionHeader text={title} classes='wrapper' />
      {capabilities.length > 0 && 
        <div className={styles.grid}>
          {capabilities.map((cap) => {

            return (
              <div className={styles.col} key={cap.id}>
                {cap.image &&
                  <Img objectFit={'contain'} className={styles.image} alt={cap.title} fluid={cap.image.fluid} />
                }
                <h3 className={styles.sectionTitle}>{cap.title}</h3>
                <ul className={styles.list}>
                  {cap.capabilitiesList.map((item, i)=> {
                    return (<li key={i}>{item}</li>)
                  })}
                </ul>
              </div>
            )
          })}
          
        </div>
      }
    </div>
  )
}