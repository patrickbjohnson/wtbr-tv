import React, { Component } from 'react';
import { Parallax } from 'react-scroll-parallax'
import MediaQuery from 'react-responsive'

import styles from './section-header.module.css'

class SectionHeader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { text, classes } = this.props

        return (
            <>
                <MediaQuery minWidth={768}>
                    <Parallax className={classes} y={[20, -40]}>
                        <div className={styles.block}>
                            <h2 className={styles.text}>{text}</h2>
                        </div>
                    </Parallax>
                </MediaQuery>
                <MediaQuery maxWidth={767}>
                  <div className={classes}>
                      <div className={styles.block}>
                          <h2 className={styles.text}>{text}</h2>
                      </div>
                  </div>
                </MediaQuery>
            </>
        )
    }
}

export default SectionHeader
