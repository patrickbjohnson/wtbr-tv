import React from 'react'
import cx from 'classnames'
import Img from 'gatsby-image'

import styles from './good-person.module.css'

const GoodPerson = (props) => {
  console.log(props)
  const {
    personBio,
    personImage
  } = props

  return (
    <div className={styles.block}>
      <div className={styles.media}>
        { personImage && (
          <Img
            className={cx(styles.image)}
            fluid={personImage.fluid}
            durationFadeIn={500}
            title={personImage.title}
            alt={personImage.title}
            fadeIn
          />
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>Mercer Brockenbrough</h3>
        {personBio &&
          <div className={styles.text}>
            <p>{personBio.personBio}</p>
          </div>
        }
      </div>
    </div>
  )
}

export default GoodPerson;
