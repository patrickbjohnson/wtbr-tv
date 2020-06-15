import { graphql } from 'gatsby'

export const contentHero = graphql`
  fragment contentHero on ContentfulContentHero {
    ... on ContentfulContentHero {
      id
      backgroundColor
      layoutSelection
      heroTitle {
        id
        heroTitle
      }
      heroContent {
        id
        heroContent
      }
    }
  }
`

export const accordionList = graphql`
  fragment accordionList on ContentfulAccordionList {
    ... on ContentfulAccordionList {
      id
      sectionTitle
      textAlignment
      activeJobs {
        ... on ContentfulTextBlock {
          id
          description {
            description
          }
          title
        }
      }
    }
  }
`

export const ticker = graphql`
  fragment ticker on ContentfulTicker {
    ... on ContentfulTicker {
      id
      text
    }
  }
`

export const clientList = graphql`
  fragment clientList on ContentfulClientList {
    ... on ContentfulClientList {
      title
      logos {
        id
        title
        fluid(maxWidth: 500, quality: 80) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

export const capabilities = graphql`
  fragment capabilities on ContentfulCapabilities {
    ... on ContentfulCapabilities {
      title
      capabilities {
        id
        title
        image {
          title
          fluid(maxWidth: 500, quality: 80) {
            ...GatsbyContentfulFluid
          }
        }
        capabilitiesList
      }
    }
  }
`

export const goodPeople = graphql`
  fragment goodPeople on ContentfulGoodPeople {
    ... on ContentfulGoodPeople {
      title
      id
      blocks {
        personBio {
          personBio
        }
        personImage {
          title
          fluid(maxWidth: 500, quality: 80) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

export const textBlockGrid = graphql`
  fragment textBlockGrid on ContentfulTextBlockGrid {
    ... on ContentfulTextBlockGrid {
      id
      textBlocks {
        id
        title
        description {
          description
        }
      }
    }
  }
`

export const videoHero = graphql`
  fragment videoHero on ContentfulVideoHero {
    ... on ContentfulVideoHero {
      id
      videoHeroTitle
      videoUrl
      videoId
      image {
        title
        fluid(maxWidth: 500, quality: 80) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`

export const featuredPost = graphql`
  fragment featuredPost on ContentfulFeaturedPosts {
    ... on ContentfulFeaturedPosts {
      id
      posts {
        ... on ContentfulContentBlock {
          id
          projectTitle
          client
          bg_color_override
          body {
            body
          }
          categories {
            category
            categoryColor
          }
          title
          type
          image {
            title
            fluid(maxWidth: 500, quality: 80) {
              ...GatsbyContentfulFluid
            }
          }
          hoverImage {
            title
            fluid(maxWidth: 500, quality: 80) {
              src
              srcWebp
            }
          }
          videos {
            __typename
            ... on ContentfulImageBlock {
              media {
                description
              }
            }
            ... on ContentfulVideoBlock {
              id
              title
              videoUrl
              vimeoId
              caption {
                id
                caption
              }
            }
          }
        }
      }
    }
  }
`

export const contentGrid = graphql`
  fragment contentGrid on ContentfulContentBlockGrid {
    ... on ContentfulContentBlockGrid {
      id
      identifier
      sectionTitle
      displayCategory
      contentBlocks {
        id
        body {
          body
        }
        bg_color_override
        categories {
          category
          categoryColor
        }
        title
        projectTitle
        client
        type
        image {
          title
          fluid(maxWidth: 500, quality: 80) {
            ...GatsbyContentfulFluid
          }
        }
        hoverImage {
          title
          fluid(maxWidth: 500, quality: 80) {
            src
            srcWebp
          }
        }
        videos {
          __typename
          ... on ContentfulImageBlock {
            media {
              description
              fluid(maxWidth: 500, quality: 80) {
                ...GatsbyContentfulFluid
              }
            }
          }
          ... on ContentfulVideoBlock {
            id
            title
            videoUrl
            vimeoId
            caption {
              id
              caption
            }
          }
        }
      }
    }
  }
`
