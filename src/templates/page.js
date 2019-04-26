import React, { Component } from 'react';
import Container from '../components/container'
import Navigation from '../components/navigation'
import ContentBlock from '../components/ContentBlock'
import ContentBlockGrid from '../components/ContentGrid'

const cleanComponentName = (component) => {
    return component.replace('Contentful', '');
}

const Page = (props) => {
    const { components } = props.pageContext;
    return (
        <Container>
            <Navigation />
            {components.map(component => {
                const type = cleanComponentName( component.__typename );
                switch ( type ) {
                    case 'ContentBlockGrid':
                      return <ContentBlockGrid key={component.id} {...component} />
                    default:
                      return (<div key={component.id} {...component}>{type}</div>)
                }
            })}
        </Container>
    )
}

export default Page