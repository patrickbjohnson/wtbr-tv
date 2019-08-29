import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { ParallaxProvider } from 'react-scroll-parallax'
import Container from '../components/container'
import Navigation from '../components/navigation'
import Footer from '../components/site-footer'
import ContentBlockGrid from '../components/ContentGrid'
import ContentHero from '../components/content-hero'
import TextBlockGrid from '../components/text-block-grid'
import AccordionList from '../components/accordion-list'
import FeaturedPosts from '../components/featured-posts'
import NewHomeHero from '../components/new-home-hero'
import HeroSlider from '../components/multi-slide-hero'
import MobileContentGrid from '../components/MobileContentGrid'
import MediaQuery from 'react-responsive'
import PageHead from '../components/PageHead'

import base from '../components/base.css'

const cleanComponentName = (component) => {
    return component.replace('Contentful', '');
}


const Page = (props) => {
  const { components, slug } = props.data.contentfulPage;

  const hasVideo = components ? components.filter(c => c.__typename === 'ContentfulVideoHero') : false

  return (
    <ParallaxProvider>
      <PageHead data={props.data.contentfulPage} location={props.location}/>
      <Container>
        <Navigation />
        <div className="pageContainer">
          {(slug === 'home' && hasVideo) &&
            <NewHomeHero key={hasVideo[0].id} {...hasVideo[0]}/>
          }
          <div style={{backgroundColor: '#fff', 'position': 'relative', 'zIndex': 2, 'paddingTop': '70px'}}>
            {components && components.map(component => {
                const type = cleanComponentName( component.__typename );
                switch ( type ) {
                  case 'GoodPeople' :
                    return <GoodPeople
                      key={component.id}
                      {...component} />
                  case 'FeaturedPosts':
                    return <FeaturedPosts
                      key={component.id}
                      {...component} />
                  case 'ContentBlockGrid':
                    return (
                      <div id={(slug === 'home' ? 'work': '')}>
                        <MediaQuery minWidth={768}>
                          <ContentBlockGrid
                              key={component.id}
                              {...component} />
                        </MediaQuery>
                        <MediaQuery maxWidth={768}>
                          <MobileContentGrid
                              key={component.id}
                              {...component} />
                        </MediaQuery>
                      </div>
                    )
                  case 'TextBlockGrid':
                      return <TextBlockGrid
                          key={component.id}
                          {...component} />
                  case 'ContentHero':
                      return <ContentHero
                          key={component.id}
                          {...component} />
                  case 'JobList':
                      return <AccordionList
                          key={component.id}
                          {...component} />
                  case 'AccordionList':
                      return <AccordionList
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
        </div>
        <Footer />
      </Container>
    </ParallaxProvider>
  )
}

export const pageQuery = graphql`
  query PostBySlug($slug:String!) {
    contentfulPage(slug:{eq: $slug}) {
      slug
      pageName
      metaDescription
      metaImage {
        title
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      components {
        __typename
        ... on ContentfulVideoHero {
          id
          videoHeroTitle
          videoId
          image {
            title
            fluid {
              ...GatsbyContentfulFluid
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
          identifier
          sectionTitle
          displayCategory
          contentBlocks {
            id
            body {
              body
            }
            category
            categoryColor
            title
            type
            image {
              title
              fluid {
                ...GatsbyContentfulFluid
              }
            }
            hoverImage {
              title
              fluid {
                ...GatsbyContentfulFluid
              }
            }
            videos {
              title
              videoId
              caption
            }
          }
        }
        ... on ContentfulFeaturedPosts {
          id
          posts {
            ... on ContentfulContentBlock {
              id
              body {
                body
              }
              category
              categoryColor
              title
              type
              image {
                title
                fluid {
                  ...GatsbyContentfulFluid
                }
              }
              hoverImage {
                title
                fluid {
                  ...GatsbyContentfulFluid
                }
              }
              videos {
                title
                videoId
                caption
              }
            }
            ... on ContentfulBlogPost {
              id
              slug
              title
              body {
                body
              }
              image {
                title
                fluid {
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
        ... on ContentfulAccordionList {
          id
          sectionTitle
          activeJobs {
            ... on ContentfulJob {
              id
              description {
                description
              }
              title
            }
            ... on ContentfulTextBlock {
              id
              description {
                description
              }
              title
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
              title
              fluid {
                ...GatsbyContentfulFluid
              }
            }
          }
        }
        ... on ContentfulGoodPeople {
          title
          id
          blocks {
            personBio {
              personBio
            }
            personImage {
              title
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
