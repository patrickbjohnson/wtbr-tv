import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Desktop from './nav-desktop'
import Mobile from './nav-mobile'

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allContentfulNavigation {
          edges {
            node {
              navItem {
                id
                slug
                pageHeadline
                seoPageTitle
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { navItem } = data.allContentfulNavigation.edges[0].node

      return (
        <>
          <Desktop nav={navItem}/>
          <Mobile nav={navItem}/>
        </>
      )
    }}
  />
)
