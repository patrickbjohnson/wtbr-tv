import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import styles from './blog.module.css'
import Layout from "../components/layout"
import Ticker from '../components/article-ticker'
import ArticlePreview from '../components/article-preview'
import HomeHero from '../components/home-hero'
import PageHead from '../components/PageHead'


const ScrollToTop = ({clickHandler}) => {
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
      window.scrollTo(0, 0);
    }
  }

  render() {
    console.log(this.props.data.contentfulPage)
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const components = get(this, 'props.data.contentfulPage.components')
    const hasVideo = components ? components.filter(c => c.__typename === 'ContentfulVideoHero') : false
    return (
      <>
      <Layout>
        <PageHead data={this.props.data.contentfulPage} />

        {(hasVideo) &&
          <HomeHero classNames={styles.blogHero} key={hasVideo[0].id} {...hasVideo[0]}/>
        }

        <div className={styles.wrapper}>
          {this.props.data.contentfulPage.tickerText &&
          <Ticker textString={this.props.data.contentfulPage.tickerText}/>
          }
          <div className="wrapper">
            <ul className="article-list">
              {posts.map( (post, i) => {
                return <ArticlePreview key={post.node.id} article={post} />
              })}
            </ul>
            
          </div>
        </div>
        
      </Layout>
      <ScrollToTop clickHandler={this.clickToScrollHandler}/>
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
    contentfulPage(template: {eq: "Blog"}) {
      slug
      pageName
      metaDescription
      metaImage {
        title
        fluid {
          ...GatsbyContentfulFluid
        }
      }
      tickerText
      components {
        __typename
        ... on ContentfulVideoHero {
          id
          videoUrl
          image {
            fluid {
              ...GatsbyContentfulFluid
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
          video {
            id
            videoUrl
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
