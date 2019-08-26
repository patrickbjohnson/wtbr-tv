import React from 'react'
import SectionHeader from './section-header'
import styles from './good-person.module.css'
import Person from './good-person'

const GoodPeople = (props) => {
  const {
      title, 
      blocks
  } = props
    
  return (
    <div className={styles.block}>
      <div>
        <SectionHeader text={title} />  
      </div>
      
        
      {blocks && blocks.map(b => {
        return (<Person key={b.id} {...b}/>)
      })}
    </div>
  )
}

export default GoodPeople;
