import React, { Component } from 'react'
import Accordion from './accordion'
import SectionHeader from './section-header'

const JobList = (props) => {
    const { sectionTitle, activeJobs } = props

    return (
        <div>
            <SectionHeader
                text={sectionTitle}
            />
            <Accordion set={activeJobs}/>
        </div>
    )
}

export default JobList