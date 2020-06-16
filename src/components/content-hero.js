import Markdown from 'react-markdown'
import React from 'react'
import Transition from './transition'
import styles from './content-hero.module.css'

function ContentHero(props) {
  const { heroTitle, heroContent, backgroundColor } = props

  return (
    <div
      className={styles.block}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : '#fff',
      }}
    >
      <div className={styles.inner}>
        <Transition className={styles.hero}>
          <Markdown source={heroTitle.heroTitle} escapeHtml={false} />
        </Transition>
        <Transition delay={250} className={styles.body}>
          {heroContent && (
            <Markdown source={heroContent.heroContent} escapeHtml={false} />
          )}
        </Transition>
      </div>
    </div>
  )
}

export default ContentHero
