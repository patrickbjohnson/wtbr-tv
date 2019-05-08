import React, { Component } from 'react';
import Accordion from './accordion';

const JobList = (props) => {
    console.log(props)
    const { sectionTitle, activeJobs } = props
    return (
        <div>
            <div>
                <h2 className="outline-text out-orange">{sectionTitle}</h2>
            </div>
            <Accordion set={activeJobs}/>
        </div>
    )
}

export default JobList