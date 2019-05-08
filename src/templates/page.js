import React, { Component } from 'react';
import Container from '../components/container'
import Navigation from '../components/navigation'
import ContentBlockGrid from '../components/ContentGrid'
import ContentHero from '../components/content-hero'
import TextBlockGrid from '../components/text-block-grid'
import JobList from '../components/job-list'

const cleanComponentName = (component) => {
    return component.replace('Contentful', '');
}

const Page = (props) => {
    const { components } = props.pageContext;

    return (
        <Container>
            <Navigation />
            {components && components.map(component => {
                const type = cleanComponentName( component.__typename );
                switch ( type ) {
                    case 'ContentBlockGrid':
                        return <ContentBlockGrid key={component.id} {...component} />
                    case 'TextBlockGrid':
                        return <TextBlockGrid key={component.id} {...component} />
                    case 'ContentHero':
                        return <ContentHero key={component.id} {...component} />
                    case 'JobList':
                        return <JobList key={component.id} {...component} />
                    default:
                      return (<div key={component.id} {...component}>{type}</div>)
                }
            })}
        </Container>
    )
}

export default Page