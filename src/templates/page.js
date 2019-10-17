import React, { Component } from 'react'
import { graphql } from 'gatsby'
import { ParallaxProvider } from 'react-scroll-parallax'
import MediaQuery from 'react-responsive'
import cx from 'classnames'

import AccordionList from '../components/accordion-list'
import ContentBlockGrid from '../components/ContentGrid'
import ContentHero from '../components/content-hero'
import FeaturedPosts from '../components/featured-posts'
import Layout from '../components/layout'
import HomeHero from '../components/home-hero'
import MobileContentGrid from '../components/MobileContentGrid'
import PageHead from '../components/PageHead'
import StickerPicker from '../components/sticker-picker'
import TextBlockGrid from '../components/text-block-grid'
import ClientList from '../components/client-list'
import Capabilities from '../components/capabilities'

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
      <StickerPicker />
      <Layout>
        <div className={cx('pageContainer', slug)}>
          {(hasVideo.length > 0) &&
            <HomeHero 
              key={hasVideo[0].id} 
              hasText={(slug === 'home')}
              {...hasVideo[0]}
            />
          }
          <div style={{backgroundColor: '#fff', 'position': 'relative', 'zIndex': 2}}>
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
                      <div>
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
                  case 'ClientList':
                    return <ClientList
                        key={component.id}
                        {...component} />
                  case 'Capabilities':
                    return <Capabilities
                        key={component.id}
                        {...component} />
                  default:
                    return false
                }
            })}
          </div>
        </div>
      </Layout>
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
          videoUrl
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
            categoryTags
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
              __typename
              ... on ContentfulImageBlock {
                media {
                  description
                  fluid {
                    ...GatsbyContentfulFluid
                  }
                }
              }
              ... on ContentfulVideoBlock {
                id
                title
                videoUrl
                caption {
                  id
                  caption
                }
              }
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
                __typename
                ... on ContentfulImageBlock {
                  media {
                    description
                  }
                }
                ... on ContentfulVideoBlock {
                  id
                  title
                  videoUrl
                  caption {
                    id
                    caption
                  }
                }
              }
            }
          }
        }
        ... on ContentfulAccordionList {
          id
          sectionTitle
          textAlignment
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
        ... on ContentfulClientList {
          title
          logos {
            id
            title
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
        ... on ContentfulCapabilities {
          title
          capabilities {
            id
            title
            image {
              title
              fluid {
                ...GatsbyContentfulFluid
              }
            }
            capabilitiesList
          }
        }
      }
    }
  }
`
export default Page
