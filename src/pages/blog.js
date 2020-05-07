import ArticlePreview from '../components/article-preview'
import HomeHero from '../components/home-hero'
import Layout from '../components/layout'
import PageHead from '../components/PageHead'
import React from 'react'
import Ticker from '../components/article-ticker'
import cx from 'classnames'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import styles from './blog.module.css'

const ScrollToTop = ({ clickHandler }) => {
  return (
    <button className={styles.scroll} onClick={() => clickHandler()}>
      <span>Top</span>
    </button>
  )
}

class BlogIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  clickToScrollHandler = () => {
    if (typeof window !== `undefined`) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const components = get(this, 'props.data.contentfulPage.components')
    const hasVideo = components
      ? components.filter(c => c.__typename === 'ContentfulVideoHero')
      : false
    const hasTicker = components
      ? components.filter(c => c.__typename === 'ContentfulTicker')
      : false

    return (
      <>
        <Layout>
          <PageHead data={this.props.data.contentfulPage} />

          {hasVideo.length > 0 && (
            <HomeHero classNames={styles.blogHero} {...hasVideo[0]} />
          )}

          <div
            className={cx(styles.wrapper, {
              'has-padding-top': hasVideo.length === 0,
            })}
          >
            {hasTicker.length > 0 && hasVideo && (
              <Ticker textString={hasTicker[0].text} />
            )}
            <div className={cx('wrapper')}>
              <ul className="article-list">
                {posts.map((post, i) => {
                  return (
                    <div class="article-wrap" key={post.node.id}>
                      <ArticlePreview article={post} />
                    </div>
                  )
                })}
              </ul>
            </div>
          </div>
        </Layout>
        <ScrollToTop clickHandler={this.clickToScrollHandler} />
      </>
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
    contentfulPage(template: { eq: "Blog" }) {
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
          ...videoHero
          ...ticker
        }
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
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
          video {
            id
            videoUrl
            vimeoId
          }
          image {
            fluid {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`
