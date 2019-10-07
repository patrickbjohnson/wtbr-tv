import React, { Component } from 'react'
import Accordion from './accordion'
import SectionHeader from './section-header'

const AccordionList = (props) => {
  const { 
    sectionTitle, 
    activeJobs 
  } = props
  
  console.log(props)
  
  return (
    <div>
      {sectionTitle &&
        <SectionHeader text={sectionTitle} />
      }
      <Accordion set={activeJobs}/>
    </div>
  )
}

export default AccordionList