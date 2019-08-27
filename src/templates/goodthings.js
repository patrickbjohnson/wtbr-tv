  import React, { createRef }from 'react'
import { Link, graphql } from 'gatsby'
import { ParallaxProvider } from 'react-scroll-parallax'
import throttle from 'lodash.throttle'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from "../components/layout"
import Accordion from '../components/accordion'
import SectionHeader from '../components/section-header'
import FeaturedPosts from '../components/featured-posts'
import GoodPerson from '../components/good-person'
import logo from '../components/goodthings-logo.svg'


import styles from './goodthings.module.css'

const BGColor = '#6E98F0'

class GoodThings extends React.Component {
  constructor(props) {
    super(props)

    this.hero = createRef()
    this.titles = []
    this.state = {
      people: null
    }
  }

  componentDidMount() {
    Array.from(document.querySelectorAll('[data-id="mission"]'), (title) => {
      this.titles.push(title)
    })
    
    window.addEventListener('scroll', throttle((e) =>
        this.scrollHandler(e)
    ), 100)
    
    this.hero.current.style.height = `${document.body.scrollHeight}px`
  }

  scrollHandler = (e) => {
    const hero = this.hero.current
    const dims = hero.getBoundingClientRect()
    const top = Math.abs(dims.top)

    hero.style.opacity = 1 - (top/600)
  }
  
  getComponentsByType = (type, comp) => {
    return comp.filter(obj => {
      return obj.__typename === type
    })
  }

  render() {
    const components = get(this, 'props.data.contentfulPage.components')
    const people = this.getComponentsByType('ContentfulGoodPeople', components)
    const accordion = this.getComponentsByType('ContentfulAccordionList', components)
    const features = this.getComponentsByType('ContentfulFeaturedPosts', components)
    
    return (
      <ParallaxProvider>
        <Layout>
          <div className={styles.hero} ref={this.hero}>
          </div>

          <div className={styles.layout}>
            <div className={styles.col}>
                <img className={styles.sticky} src={logo} alt="Good Things"/>
            </div>
            <div className={styles.col}>
              <h1 className={styles.title}>Let’s build something meaningful together, one cause, one event, one good thing at a time.</h1>
              <div className={styles.section}>
                <SectionHeader classes="parallax-tal parallax-transparent" text="Mission" uniqueID='mission'/>
                <p>A small team of dedicated organizers and strategists who specialize in socially-driven campaigns & event management that result in “good things” for our clients and communities.</p>
              </div>


              <div className={styles.section}>
                <SectionHeader classes="parallax-tal parallax-transparent" text="Good People" />  
                {people && people.map((p, i) => {
                  return p.blocks.map((v) => {
                    return (<GoodPerson key={v.id} {...v} />)
                  })
                })}
              </div>
              
            </div>
          </div>

          <div className="wrapper">
            {accordion && accordion.map((a, i) => {
              return (
                <Accordion key={Math.random()} fullwidth={true} set={a.activeJobs}/>
              )
            })}
            
            {features && features.map((f, i) => {
              return (
                <FeaturedPosts key={Math.random()} {...f}/>
              )
            })}
          </div>
        </Layout>
      </ParallaxProvider>
    )
  }
}



export const pageQuery = graphql`
  query PageBySlug($slug:String!) {
    contentfulPage(slug:{eq: $slug}) {
      seoPageTitle
      slug
      components {
        __typename
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
                  fluid {
                    ...GatsbyContentfulFluid
                  }
                }
                hoverImage {
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
          ... on ContentfulGoodPeople {
            title
            id
            blocks {
              personName
              personBio {
                personBio
              }
              personImage {
                fluid {
                  ...GatsbyContentfulFluid
                }
              }
            }
          }
        }
     }
 }
`
export default GoodThings
