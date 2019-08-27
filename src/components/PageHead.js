import React from 'react'
import Helmet from 'react-helmet'

export default ({data, location}) => {

  const {
    pageName, 
    metaTitle,
    metaDescription,
    metaImage
  } = data

  const name = metaTitle ? metaTitle : `${pageName} - WTBR` 
  const image = metaImage ? metaImage.fluid.src : 'http://static1.squarespace.com/static/5704437f27d4bd14a1d66aff/t/5705460a59827e7cad77b66d/1459963403823/LogoLong_001.png?format=1500w'
  const description = metaDescription ? metaDescription : 'Where the Buffalo Roam is a group of friends, filmmakers, and get-it-done-with-a-smile type folks, who have been in the business for over ten years and love every aspect of the production process.'
  const url = location ? location.href : 'https://wtbr.tv'
  return (
    <Helmet>
      <title>{name}</title>
      <meta property="og:title" content={name} />
      <meta name="twitter:title" content={name} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />
      <meta itemprop="name" content="Where The Buffalo Roam" />
      <meta name="url" content={url} />
      <meta itemprop="url" content={url} />
      <meta property='og:image'  content={image} />
      <meta property='twitter:image'  content={image} />
      <meta itemprop="thumbnailUrl" content={image} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' /> 
    </Helmet>
  )
}