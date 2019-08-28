import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Desktop from './nav-desktop'
import Mobile from './nav-mobile'
import MediaQuery from 'react-responsive'

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
                pageName
                pageHeadline
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { navItem } = data.allContentfulNavigation.edges[0].node

      return (
        <div>
          <MediaQuery minWidth={768}>
            <Desktop nav={navItem}/>
          </MediaQuery>
          <MediaQuery maxWidth={767}>
            <Mobile nav={navItem}/>
          </MediaQuery>
        </div>
      )
    }}
  />
)
