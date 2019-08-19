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
                  ... on ContentfulVideoHero {
                    id
                    videoHeroTitle
                    videoId
                    videoBackground {
                      id
                      file {
                        url
                        fileName
                        contentType
                      }
                    }
                  }
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
                    sectionTitle
                    displayCategory
                    contentBlocks {
                      id
                      title
                      subTitle
                      category
                      categoryColor
                      description
                      backgroundImage {
                        id
                        fluid {
                          src
                        }
                      }
                    }
                  }
                  ... on ContentfulFeaturedPosts {
                    id
                    posts {
                      id
                      slug
                      title
                      heroImage {
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
                      body {
                        id
                        body
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
                  ... on ContentfulHeroSlider {
                    id
                    heroSlides {
                      id
                      heroSlug
                      title {
                        title
                      }
                      slideImage {
                        fluid {
                          src
                        }
                      }
                    }
                  }
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
