import React, { createRef } from 'react'
import { graphql } from 'gatsby'
import { ParallaxProvider } from 'react-scroll-parallax'
import MediaQuery from 'react-responsive'
import throttle from 'lodash.throttle'
import get from 'lodash/get'
import cx from 'classnames'

import Accordion from '../components/accordion'
import FadeUp from '../components/fade-up'
import FeaturedPosts from '../components/featured-posts'
import GoodPerson from '../components/good-person'
import Layout from '../components/layout'
import logo from '../../static/goodthings-logo.svg'
import PageHead from '../components/PageHead'
import Transition from '../components/transition'
import VisibilitySensor from '../components/VisibilitySensor'

import styles from './goodthings.module.css'
import header from '../components/section-header.module.css'

const Header = ({ text, noe, classNames }) => {
  return (
    <div className={cx(classNames, header.block, styles.headerBlock)}>
      <h2
        className={cx(
          header.text,
          header.noOutline,
          header.tac,
          styles.header,
          {
            [header.noe]: noe,
            [styles.midHeadline]: noe,
          }
        )}
      >
        {text}
      </h2>
    </div>
  )
}

class GoodThings extends React.Component {
  constructor(props) {
    super(props)

    this.hero = createRef()
    this.titles = []
    this.state = {
      people: null,
    }
  }

  componentDidMount() {
    const components = get(this, 'props.data.contentfulPage.components')

    window.addEventListener(
      'scroll',
      throttle(e => {
        this.scrollHandler(e)
      }, 100)
    )

    this.setState(
      {
        people: this.getComponentsByType('ContentfulGoodPeople', components),
        accordion: this.getComponentsByType(
          'ContentfulAccordionList',
          components
        ),
        features: this.getComponentsByType(
          'ContentfulFeaturedPosts',
          components
        ),
      },
      () => {
        this.hero.current.style.height = `${document.body.scrollHeight}px`
      }
    )
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler)
  }

  scrollHandler = e => {
    const hero = this.hero.current
    if (!hero) return
    const dims = hero.getBoundingClientRect()
    const top = Math.abs(dims.top)

    hero.style.opacity = 1 - top / 600
  }

  getComponentsByType = (type, comp) => {
    return comp.filter(obj => {
      return obj.__typename === type
    })
  }

  render() {
    const { people, accordion, features } = this.state

    return (
      <ParallaxProvider>
        <PageHead
          data={this.props.data.contentfulPage}
          location={this.props.location}
        />
        <Layout>
          <div
            style={{
              backgroundColor: 'white',
              position: 'relative',
              zIndex: 10,
            }}
          >
            <div className={styles.hero} ref={this.hero}></div>
            <div className={styles.wrapper}>
              <div
                className={styles.layout}
                style={{ position: 'relative', zIndex: 2 }}
              >
                <Transition className={styles.col}>
                  <img className={styles.sticky} src={logo} alt="Good Things" />
                </Transition>
                <div className={styles.col}>
                  <Transition delay={250}>
                    <div className={styles.fullHeight}>
                      {/* <h1 className={styles.title}>Let’s build something meaningful together, one cause, one event, one good thing at a time.</h1> */}

                      <div className={styles.section}>
                        <Header noe text="Mission" />
                        <p>
                          A small team of dedicated organizers and strategists
                          who specialize in socially-driven campaigns & event
                          management that result in “good things” for our
                          clients and communities.
                        </p>
                      </div>
                    </div>
                  </Transition>
                  {people && (
                    <div className={styles.section}>
                      <VisibilitySensor once>
                        {({ isVisible }) => {
                          return (
                            <FadeUp isVisible={isVisible} delay={0}>
                              <Header noe text="Good People" />
                            </FadeUp>
                          )
                        }}
                      </VisibilitySensor>

                      {people.map((p, i) => {
                        return p.blocks.map(v => {
                          return (
                            <>
                              <MediaQuery minWidth={1024}>
                                <VisibilitySensor once>
                                  {({ isVisible }) => {
                                    return (
                                      <FadeUp isVisible={isVisible} delay={0}>
                                        <GoodPerson key={v.id} {...v} />
                                      </FadeUp>
                                    )
                                  }}
                                </VisibilitySensor>
                              </MediaQuery>
                              <MediaQuery maxWidth={1024}>
                                <GoodPerson key={v.id} {...v} />
                              </MediaQuery>
                            </>
                          )
                        })
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div>
                  {accordion &&
                    accordion.map(a => {
                      return (
                        <Accordion
                          key={Math.random()}
                          set={a.activeJobs}
                          alignment={a.textAlignment}
                        />
                      )
                    })}
                </div>

                {features &&
                  features.map(f => {
                    return <FeaturedPosts key={Math.random()} {...f} />
                  })}
              </div>
            </div>
          </div>
        </Layout>
      </ParallaxProvider>
    )
  }
}

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
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
export default GoodThings
