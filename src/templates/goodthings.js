import React, { createRef }from 'react'
import { Link, graphql } from 'gatsby'
import { ParallaxProvider } from 'react-scroll-parallax'
import throttle from 'lodash.throttle'
import get from 'lodash/get'
import cx from 'classnames'
import PageHead from '../components/PageHead'
import Navigation from '../components/navigation'
import Container from "../components/container"
import Accordion from '../components/accordion'
import SectionHeader from '../components/section-header'
import FeaturedPosts from '../components/featured-posts'
import GoodPerson from '../components/good-person'
import logo from '../components/goodthings-logo.svg'
import Footer from '../components/site-footer'
import Transition from '../components/transition'


import styles from './goodthings.module.css'
import header from '../components/section-header.module.css'

const BGColor = '#6E98F0'

const Header = ({text}) => {
  return (
    <div className={header.block}>
      <h2 className={cx(header.text, header.tac, header.domaine)}>{text}</h2>
    </div>
  )
}

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
    const components = get(this, 'props.data.contentfulPage.components')

    window.addEventListener('scroll', throttle((e) => {
      this.scrollHandler(e)
    }, 100))

    this.setState({
      people: this.getComponentsByType('ContentfulGoodPeople', components),
      accordion: this.getComponentsByType('ContentfulAccordionList', components),
      features: this.getComponentsByType('ContentfulFeaturedPosts', components)
    }, () => {
      this.hero.current.style.height = `${document.body.scrollHeight}px`
    })
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler)
  }

  scrollHandler = (e) => {
    const hero = this.hero.current
    if(!hero) return
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
    const {
      people,
      accordion,
      features
    } = this.state
    return (
      <ParallaxProvider>
        <PageHead data={this.props.data.contentfulPage} location={this.props.location} />
        <Container>
          <Navigation />
          <div className={styles.hero} ref={this.hero}></div>
          <div className={styles.layout}
            style={{position: 'relative', 'zIndex': 2, 'paddingTop': '150px'}}
          >
            <Transition className={styles.col}>
                <img className={styles.sticky} src={logo} alt="Good Things"/>
            </Transition>
            <Transition delay={250} className={styles.col}>
              <h1 className={styles.title}>Let’s build something meaningful together, one cause, one event, one good thing at a time.</h1>

              <div className={styles.section}>
                <Header text="Mission"/>
                <p>A small team of dedicated organizers and strategists who specialize in socially-driven campaigns & event management that result in “good things” for our clients and communities.</p>
              </div>

              {people &&
                <div className={styles.section}>
                  <Header text="Good People"/>

                  {people.map((p, i) => {
                    return p.blocks.map((v) => {
                      return (<GoodPerson key={v.id} {...v} />)
                    })
                  })}
                </div>
              }
            </Transition>
          </div>

          <div>
            {accordion && accordion.map((a) => {
              return (
                <Accordion key={Math.random()} fullwidth={true} set={a.activeJobs}/>
              )
            })}

            {features && features.map((f) => {
              return (
                <FeaturedPosts key={Math.random()} {...f}/>
              )
            })}
          </div>
          <Footer />
        </Container>
      </ParallaxProvider>
    )
  }
}

export const pageQuery = graphql`
  query PageBySlug($slug:String!) {
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
