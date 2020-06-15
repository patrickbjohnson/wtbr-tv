import React, { Component } from 'react'

import AccordionList from '../components/accordion-list'
import Capabilities from '../components/capabilities'
import ClientList from '../components/client-list'
import ContentBlockGrid from '../components/ContentGrid'
import ContentHero from '../components/content-hero'
import FeaturedPosts from '../components/featured-posts'
import HomeHero from '../components/home-hero'
import InView from '../components/inview'
import Layout from '../components/layout'
import MediaQuery from 'react-responsive'
import MobileContentGrid from '../components/MobileContentGrid'
import PageHead from '../components/PageHead'
import { ParallaxProvider } from 'react-scroll-parallax'
import StickerPicker from '../components/sticker-picker'
import TextBlockGrid from '../components/text-block-grid'
import base from '../components/base.css'
import cx from 'classnames'
import { graphql } from 'gatsby'

const cleanComponentName = component => {
  return component.replace('Contentful', '')
}

const Page = props => {
  const { components, slug } = props.data.contentfulPage

  let videoRendered = false

  return (
    <ParallaxProvider>
      <PageHead data={props.data.contentfulPage} location={props.location} />
      <MediaQuery minWidth={768}>
        <StickerPicker />
      </MediaQuery>

      <Layout>
        <div className={cx('pageContainer', slug)}>
          <div
            style={{ backgroundColor: '#fff', position: 'relative', zIndex: 2 }}
          >
            {components &&
              components.map(component => {
                const type = cleanComponentName(component.__typename)
                switch (type) {
                  case 'VideoHero':
                    console.log(videoRendered)
                    if (videoRendered) {
                      return false
                    } else {
                      videoRendered = true
                      return (
                        <InView>
                          <HomeHero
                            key={component.id}
                            hasText={slug === 'home'}
                            {...component}
                          />
                        </InView>
                      )
                    }
                    break
                  case 'GoodPeople':
                    return (
                      <InView>
                        <GoodPeople key={component.id} {...component} />
                      </InView>
                    )
                  case 'FeaturedPosts':
                    return (
                      <InView>
                        <FeaturedPosts key={component.id} {...component} />
                      </InView>
                    )
                  case 'ContentBlockGrid':
                    return (
                      <div key={component.id}>
                        <InView>
                          <MediaQuery minWidth={768}>
                            <ContentBlockGrid
                              key={component.id}
                              {...component}
                            />
                          </MediaQuery>
                          <MediaQuery maxWidth={768}>
                            <MobileContentGrid
                              key={component.id}
                              {...component}
                            />
                          </MediaQuery>
                        </InView>
                      </div>
                    )
                  case 'TextBlockGrid':
                    return (
                      <InView>
                        <TextBlockGrid key={component.id} {...component} />
                      </InView>
                    )
                  case 'ContentHero':
                    return (
                      <InView>
                        <ContentHero key={component.id} {...component} />
                      </InView>
                    )
                  case 'JobList':
                    return (
                      <InView>
                        <AccordionList key={component.id} {...component} />
                      </InView>
                    )
                  case 'AccordionList':
                    return (
                      <InView>
                        <AccordionList key={component.id} {...component} />
                      </InView>
                    )
                  case 'ClientList':
                    return (
                      <InView>
                        <ClientList key={component.id} {...component} />
                      </InView>
                    )
                  case 'Capabilities':
                    return (
                      <InView>
                        <Capabilities key={component.id} {...component} />
                      </InView>
                    )
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
  query PostBySlug($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
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
        ... on Node {
          ...contentHero
          ...accordionList
          ...clientList
          ...capabilities
          ...goodPeople
          ...textBlockGrid
          ...videoHero
          ...contentGrid
          ...featuredPost
        }
      }
    }
  }
`
export default Page
