const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const pageTemplate = require.resolve('./src/templates/page.js')
    const postTemplate = require.resolve('./src/templates/blog-post.js')
    const goodThings = require.resolve('./src/templates/goodthings.js')
    const blog = require.resolve('./src/pages/blog.js')
    
    resolve(
      graphql(
        `
        {
          allContentfulBlogPost {
            edges {
              node {
                slug
              }
            }
          }
          allContentfulPage {
            edges {
              node {
                slug
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
          
          if (slug === 'happenings') {
            template = blog
          } else if (slug === 'goodthings') {
            template = goodThings
          } else {
            template = pageTemplate
          }
          
          createPage({
            path: (slug === 'home') ? '/' : `/${slug}`,
            component: template,
            context: {
              slug: slug
            },
          })
        })

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post, index) => {
          const slug = post.node.slug.toLowerCase();
          
          createPage({
            path: `/happenings/${slug}/`,
            component: postTemplate,
            context: {
              slug: slug
            },
          })
        })
      })
    )
  })
}
