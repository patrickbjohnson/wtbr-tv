import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
import Layout from "../components/layout"
import Ticker from '../components/article-ticker'
import ArticlePreview from '../components/article-preview'
import HomeHero from '../components/home-hero'

class BlogIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    
    const components = get(this, 'props.data.contentfulPage.components')
    const hasVideo = components ? components.filter(c => c.__typename === 'ContentfulVideoHero') : false
    
    return (
      <Layout location={this.props.location} >
          <Helmet title={siteTitle} />
          {(hasVideo) &&
            <HomeHero classNames={styles.blogHero} key={hasVideo[0].id} {...hasVideo[0]}/>
          }
          <Ticker articles={posts} />
          <div className="wrapper">
            <ul className="article-list">
              {posts.map( (post, i) => {
                return <ArticlePreview key={post.node.id} article={post} />
              })}
            </ul>
          </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPage(slug: {eq: "happenings"}) {
      slug
      pageName
      seoPageTitle
      components {
        __typename
        ... on ContentfulVideoHero {
          id
          videoHeroTitle
          videoId
          videoBackground {
            id
            fluid {
              src
            }
          }
        }
      }
    }
    allContentfulBlogPost(sort: {fields: [publishDate], order: DESC}) {
      edges {
        node {
          id
          title
          slug
          publishDate
          body {
            id
            body
            childMarkdownRemark {
              html
            }
          }
          image {
            fluid {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  }
`
