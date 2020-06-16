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
import LazyLoad from 'react-lazyload'
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
                    if (videoRendered) {
                      return false
                    } else {
                      videoRendered = true
                      return (
                        <InView key={component.id}>
                          <HomeHero hasText={slug === 'home'} {...component} />
                        </InView>
                      )
                    }
                    break
                  case 'GoodPeople':
                    return (
                      <InView key={component.id}>
                        <GoodPeople {...component} />
                      </InView>
                    )
                  case 'FeaturedPosts':
                    return (
                      <InView key={component.id}>
                        <FeaturedPosts {...component} />
                      </InView>
                    )
                  case 'ContentBlockGrid':
                    return (
                      <div key={component.id}>
                        <LazyLoad height="100%" offset={200}>
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
                        </LazyLoad>
                      </div>
                    )
                  case 'TextBlockGrid':
                    return (
                      <InView key={component.id}>
                        <TextBlockGrid {...component} />
                      </InView>
                    )
                  case 'ContentHero':
                    return (
                      <InView key={component.id}>
                        <ContentHero {...component} />
                      </InView>
                    )
                  case 'JobList':
                    return (
                      <InView key={component.id}>
                        <AccordionList {...component} />
                      </InView>
                    )
                  case 'AccordionList':
                    return (
                      <InView key={component.id}>
                        <AccordionList {...component} />
                      </InView>
                    )
                  case 'ClientList':
                    return (
                      <InView key={component.id}>
                        <ClientList {...component} />
                      </InView>
                    )
                  case 'Capabilities':
                    return (
                      <InView key={component.id}>
                        <Capabilities {...component} />
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
