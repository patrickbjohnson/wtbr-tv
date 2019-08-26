import React, { createRef }from 'react'
import { Link, graphql } from 'gatsby'
import { ParallaxProvider } from 'react-scroll-parallax'
import throttle from 'lodash.throttle'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from "../components/layout"
import Accordion from '../components/accordion'
import SectionHeader from '../components/section-header'
import BlockSet from '../components/story-block-set'
import GoodPerson from '../components/good-person'
import logo from '../components/goodthings-logo.svg'

import styles from './goodthings.module.css'

const blocks = [
    {
        title: "Volunteering at Centeral Texas Food Bank",
        text: "Team Good Things along with some great friends, old and brand new, packed almost 700 lunches for kids at Austin’s @ctxfoodbank earlier this week during @sxsw. Thanks for the opportunity to pitch in at your amazing facility!! It was a real privilege and we will be back again. Good Things!!",
        image: "https://placehold.it/1200x900"
    },
    {
        title: "Tristique Bibendum Dapibus",
        text: "Team Good Things along with some great friends, old and brand new, packed almost 700 lunches for kids at Austin’s @ctxfoodbank earlier this week during @sxsw. Thanks for the opportunity to pitch in at your amazing facility!! It was a real privilege and we will be back again. Good Things!!",
        image: "https://placehold.it/1200x900"
    },
    {
        title: "Volunteering at Centeral Texas Food Bank",
        text: "Team Good Things along with some great friends, old and brand new, packed almost 700 lunches for kids at Austin’s @ctxfoodbank earlier this week during @sxsw. Thanks for the opportunity to pitch in at your amazing facility!! It was a real privilege and we will be back again. Good Things!!",
        image: "https://placehold.it/1200x900"
    },
    {
        title: "Volunteering at Centeral Texas Food Bank",
        text: "Team Good Things along with some great friends, old and brand new, packed almost 700 lunches for kids at Austin’s @ctxfoodbank earlier this week during @sxsw. Thanks for the opportunity to pitch in at your amazing facility!! It was a real privilege and we will be back again. Good Things!!",
        image: "https://placehold.it/1200x900"
    }
]

const colors = [
    '#FD2333',
    '#50C5A2',
    '#E53C97',
    '#BBF4F2',
    '#7DF8B9',
    '#FF5F23',
    '#FFB525',
    '#40C1C7',
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

    this.hero = createRef()
  }

  componentDidMount() {

    window.addEventListener('scroll', throttle((e) =>
        this.scrollHandler(e)
    ), 100)
  }

  scrollHandler = (e) => {
      const hero = this.hero.current
      const dims = hero.getBoundingClientRect()
      const top = Math.abs(dims.top)

      hero.style.opacity = 1 - (top/600)
  }

  render() {

    return (
        <ParallaxProvider>

        <Layout>
          <div className={styles.hero} ref={this.hero}>
          </div>

          <div className={styles.layout}>
                <div className={styles.col}>
                    <img className={styles.sticky} src={logo} alt=""/>
                </div>
                <div className={styles.col}>
                    <h1 className={styles.title}>Let’s build something meaningful together, one cause, one event, one good thing at a time.</h1>
                    <div className={styles.section}>
                        <SectionHeader classes="parallax-tal parallax-transparent" text="Mission"/>
                        <p>A small team of dedicated organizers and strategists who specialize in socially-driven campaigns & event management that result in “good things” for our clients and communities.</p>
                    </div>

                    <div className={styles.section}>
                        <SectionHeader classes="parallax-tal parallax-transparent" text="Good People"/>
                        {/* <GoodPerson />
                        <GoodPerson />
                        <GoodPerson /> */}
                    </div>

                </div>
            </div>

            <div className="wrapper">
                <Accordion fullwidth={true} set={accordionData}/>
                <BlockSet
                    title="Good Things Experiences"
                    colors={colors}
                    blocks={blocks}
                />
            </div>
        </Layout>
      </ParallaxProvider>
    )
  }
}

export default GoodThings
