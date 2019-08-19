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
import FlickitySlider from '../components/flickity-slider'

const cleanComponentName = (component) => {
    return component.replace('Contentful', '');
}

const Page = (props) => {

    const { components, slug } = props.pageContext;

    const hasVideo = components > 0 ? components.filter(c => c.__typename === 'ContentfulVideoHero') : false

    return (
        <ParallaxProvider>
        <Container>
            <Navigation />
            <div style={{'paddingTop': '70px'}}>
                {(slug === 'home' && hasVideo) &&
                    <HomeHero key={hasVideo[0].id} {...hasVideo[0]}/>
                }
                
                <FlickitySlider />
                
                {components && components.map(component => {
                    const type = cleanComponentName( component.__typename );

                    switch ( type ) {
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
                          return false
                    }
                })}
            </div>
            <Footer />
        </Container>
        </ParallaxProvider>
    )
}

export default Page