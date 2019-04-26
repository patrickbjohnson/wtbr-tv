import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.css'
import Layout from "../components/layout"
import Ticker from '../components/article-ticker'
import ArticlePreview from '../components/article-preview'


class BlogIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')

    return (
      <Layout location={this.props.location} >
          <Helmet title={siteTitle} />
          <div className={styles.hero}>
            <img src="http://placehold.it/1600x600" alt=""/>
          </div>
          <Ticker articles={posts} />
          <div className="wrapper">
            <ul className="article-list">
              {posts.map( (post, i) => {
                return <ArticlePreview key={i} article={post} />
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
    allContentfulBlogPost(sort: {fields: [publishDate], order: DESC}) {
      edges {
        node {
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
          heroImage {
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
          description {
            description
          }
        }
      }
    }
  }
`
