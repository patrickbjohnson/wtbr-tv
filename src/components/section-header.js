import React, { Component } from 'react';
import { Parallax, withController } from 'react-scroll-parallax'

import styles from './section-header.module.css'

class SectionHeader extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const { text } = this.props

        return (
            <Parallax className="full-width" y={[100, -20]}>
                <div className={styles.block}>
                    <h2 className={styles.text}>{text}</h2>
                </div>
            </Parallax>

        )
    }
}

export default SectionHeader