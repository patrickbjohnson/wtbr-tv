const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const pageTemplate = require.resolve('./src/templates/page.js')
    const postTemplate = require.resolve('./src/templates/blog-post.js')

    resolve(
      graphql(
        `
        {
          allContentfulBlogPost {
            edges {
              node {
                title
                slug
                publishDate
                body {
                  id
                  body
                }
                heroImage {
                  fluid {
                    base64
                    tracedSVG
                    aspectRatio
                    src
                    srcSet
                    srcWebp
                    srcSetWebp
                    sizes
                  }
                }
                description {
                  description
                }
              }
            }
          }
          allContentfulPage {
            edges {
              node {
                seoPageTitle
                slug
                components {
                  __typename
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
                  ... on ContentfulContentBlockGrid {
                    id
                    contentBlocks {
                      id
                      title
                      subTitle
                      category
                      description
                      backgroundImage {
                        id
                        fluid {
                          base64
                          tracedSVG
                          aspectRatio
                          src
                          srcSet
                          srcWebp
                          srcSetWebp
                          sizes
                        }
                      }
                    }
                  }
                  ... on ContentfulFeaturedPosts {
                    id
                    posts {
                      id
                      title
                      description {
                        childMarkdownRemark {
                          rawMarkdownBody
                        }
                      }
                    }
                  }
                  ... on ContentfulJobList {
                    id
                    sectionTitle
                    activeJobs {
                      id
                      title
                      description {
                        id
                        description
                      }
                    }
                  }
                  ... on ContentfulContentHero {
                    id
                    heroTitle
                    heroContent {
                      id
                    }
                    backgroundColor
                  }
                }
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const pages = result.data.allContentfulPage.edges

        pages.forEach((page, index) => {
          const slug = page.node.slug.toLowerCase();
          createPage({
            path: (slug === 'home') ? '/' : `/${slug}`,
            component: pageTemplate,
            context: {
              slug: page.node.slug,
              components: page.node.components
            },
          })
        })

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: postTemplate,
            context: {
              slug: post.node.slug,
              title: post.node.title
            },
          })
        })
      })
    )
  })
}
