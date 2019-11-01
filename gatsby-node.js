const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const pageTemplate = require.resolve('./src/templates/page.js')
    const postTemplate = require.resolve('./src/templates/blog-post.js')
    const goodThings = require.resolve('./src/templates/goodthings.js')
    const blog = require.resolve('./src/pages/blog.js')
    const templates = {
      'Blog': blog, 
      'Good Things': goodThings,
      'Basic Page': pageTemplate
    }
    
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
                template
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

        let blogSlug = ''
        pages.forEach((page, index) => {
          const slug = page.node.slug.toLowerCase();
          const template = page.node.template ? templates[page.node.template] : templates['Basic Page']
          
          if (page.node.template === 'Blog') {
            blogSlug === page.node.slug
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
            path: `/${blogSlug}/${slug}/`,
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
