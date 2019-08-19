import React, { Component } from 'react'
import { graphql } from 'gatsby'
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

import base from '../components/base.css'

const cleanComponentName = (component) => {
    return component.replace('Contentful', '');
}

const Page = (props) => {
    const { components, slug } = props.data.contentfulPage;

    const hasVideo = components ? components.filter(c => c.__typename === 'ContentfulVideoHero') : false

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
export const pageQuery = graphql`
 query PostBySlug($slug:String!) {
     contentfulPage(slug:{eq: $slug}) {
        seoPageTitle
        slug
        components {
          __typename
          ... on ContentfulVideoHero {
            id
            videoHeroTitle
            videoId
            videoBackground {
              id
              file {
                url
                fileName
                contentType
              }
            }
          }
          ... on ContentfulTextBlockGrid {
            id
            textBlocks {
              id
              title
              description {
                description
              }
            }
          }
          ... on ContentfulContentBlockGrid {
            id
            sectionTitle
            displayCategory
            contentBlocks {
              id
              title
              subTitle
              category
              categoryColor
              description
              backgroundImage {
                id
                fluid {
                    ...GatsbyContentfulFluid
                }
              }
            }
          }
          ... on ContentfulFeaturedPosts {
            id
            posts {
              id
              slug
              title
              heroImage {
                id
                fluid {
                  ...GatsbyContentfulFluid
                }
              }
              body {
                id
                body
              }
            }
          }
          ... on ContentfulJobList {
            id
            sectionTitle
            activeJobs {
              id
              title
              description {
                id
                description
              }
            }
          }
          ... on ContentfulHeroSlider {
            id
            heroSlides {
              id
              heroSlug
              title {
                title
              }
              slideImage {
                fluid {
                    ...GatsbyContentfulFluid
                }
              }
            }
          }
          ... on ContentfulContentHero {
            id
            backgroundColor
            layoutSelection
            heroTitle {
              id
              heroTitle
            }
            heroContent {
              id
              heroContent
            }
          }
        }
     }
 }
`
export default Page
