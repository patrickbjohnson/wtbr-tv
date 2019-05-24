import React from 'react'
import { Link, graphql } from 'gatsby'
import { ParallaxProvider } from 'react-scroll-parallax'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from "../components/layout"
import Accordion from '../components/accordion'
import SectionHeader from '../components/section-header'
import BlockSet from '../components/story-block-set'
import GoodPerson from '../components/good-person'

import styles from './goodthings.module.css'

const blocks = [
    {
        title: "Volunteering at Centeral Texas Food Bank",
        text: "Team Good Things along with some great friends, old and brand new, packed almost 700 lunches for kids at Austin’s @ctxfoodbank earlier this week during @sxsw. Thanks for the opportunity to pitch in at your amazing facility!! It was a real privilege and we will be back again. Good Things!!",
        image: "http://placehold.it/1200x900"
    },
    {
        title: "Tristique Bibendum Dapibus",
        text: "Team Good Things along with some great friends, old and brand new, packed almost 700 lunches for kids at Austin’s @ctxfoodbank earlier this week during @sxsw. Thanks for the opportunity to pitch in at your amazing facility!! It was a real privilege and we will be back again. Good Things!!",
        image: "http://placehold.it/1200x900"
    },
    {
        title: "Volunteering at Centeral Texas Food Bank",
        text: "Team Good Things along with some great friends, old and brand new, packed almost 700 lunches for kids at Austin’s @ctxfoodbank earlier this week during @sxsw. Thanks for the opportunity to pitch in at your amazing facility!! It was a real privilege and we will be back again. Good Things!!",
        image: "http://placehold.it/1200x900"
    },
    {
        title: "Volunteering at Centeral Texas Food Bank",
        text: "Team Good Things along with some great friends, old and brand new, packed almost 700 lunches for kids at Austin’s @ctxfoodbank earlier this week during @sxsw. Thanks for the opportunity to pitch in at your amazing facility!! It was a real privilege and we will be back again. Good Things!!",
        image: "http://placehold.it/1200x900"
    }
]


const accordionData = [
    {
        id: "adslkfjdfl",
        title: "This is a title",
        description: {
            description: "Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    },
    {
        id: "adslkfjdfl2",
        title: "This is a title",
        description: {
            description: "Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    },
    {
        id: "adslkfjdfl4",
        title: "This is a title",
        description: {
            description: "Cras mattis consectetur purus sit amet fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    }
]

class GoodThings extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
        <ParallaxProvider>

        <Layout>
          {/* <Helmet title={siteTitle} /> */}
          <div className={styles.hero}>
            <img src="http://placehold.it/1600x600" alt=""/>
          </div>

          <div className={styles.layout}>
                <div className={styles.col}>
                    <img className={styles.sticky} src="http://placehold.it/300x300" alt=""/>
                </div>
                <div className={styles.col}>
                    <h1>Let’s build something meaningful together, one cause, one event, one good thing at a time.</h1>
                    <div className={styles.section}>
                        <SectionHeader text="Mission"/>
                        <p>A small team of dedicated organizers and strategists who specialize in socially-driven campaigns & event management that result in “good things” for our clients and communities.</p>
                    </div>

                    <div className={styles.section}>
                        <SectionHeader text="Good People"/>
                        <GoodPerson />
                        <GoodPerson />
                        <GoodPerson />
                    </div>

                </div>
            </div>

            <div className="wrapper">
                <Accordion set={accordionData}/>
                <BlockSet
                    title="Good Things Experiences"
                    blocks={blocks}
                />
            </div>
        </Layout>
      </ParallaxProvider>
    )
  }
}

export default GoodThings

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allContentfulBlogPost(sort: {fields: [publishDate], order: DESC}) {
//       edges {
//         node {
//           title
//           slug
//           publishDate
//           body {
//             id
//             body
//             childMarkdownRemark {
//               html
//             }
//           }
//           heroImage {
//             fluid {
//               base64
//               tracedSVG
//               aspectRatio
//               src
//               srcSet
//               srcWebp
//               srcSetWebp
//               sizes
//             }
//           }
//         }
//       }
//     }
//   }
// `
