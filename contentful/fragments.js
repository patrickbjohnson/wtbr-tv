export const posts = `
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
                    fluid(maxWidth: 500, quality: 100) {
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
`
