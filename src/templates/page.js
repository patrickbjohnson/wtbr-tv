import React, { Component } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'
import Container from '../components/container'
import Navigation from '../components/navigation'
import Footer from '../components/site-footer'
import ContentBlockGrid from '../components/ContentGrid'
import ContentHero from '../components/content-hero'
import TextBlockGrid from '../components/text-block-grid'
import JobList from '../components/job-list'
import FeaturedPosts from '../components/featured-posts'
import HomeHero from '../components/home-hero'
import HeroSlider from '../components/multi-slide-hero'

const cleanComponentName = (component) => {
    return component.replace('Contentful', '');
}

const Page = (props) => {
    const { components } = props.pageContext;

    return (
        <ParallaxProvider>
        <Container>
            <Navigation />
            <div style={{'paddingTop': '70px'}}>

                {components && components.map(component => {
                    const type = cleanComponentName( component.__typename );

                    switch ( type ) {
                        case 'ContentHomeHero':
                             return <HomeHero
                                    key={component.id}
                                    {...component} />
                        case 'ContentBlockGrid':
                            return <ContentBlockGrid
                                key={component.id}
                                {...component} />
                        case 'TextBlockGrid':
                            return <TextBlockGrid
                                key={component.id}
                                {...component} />
                        case 'ContentHero':
                            return <ContentHero
                                key={component.id}
                                {...component} />
                        case 'JobList':
                            return <JobList
                                key={component.id}
                                {...component} />
                        case 'FeaturedPosts':
                            return <FeaturedPosts
                                key={component.id}
                                {...component} />
                        case 'HeroSlider':
                            return <HeroSlider 
                                key={component.id}
                                {...component} />
                        default:
                          return (<div
                            key={component.id}
                            {...component}>
                                {type}
                            </div>)
                    }
                })}
            </div>
            <Footer />
        </Container>
        </ParallaxProvider>
    )
}

export default Page