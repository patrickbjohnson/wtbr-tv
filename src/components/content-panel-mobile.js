import React, { Component } from 'react'
import cx from 'classnames'
import Img from 'gatsby-image'
import Markdown from 'react-markdown'
import styles from './content-panel.module.css'

class ContentPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }
    
    render() {
        const {
            title,
            slug,
            image, 
            body,
            type,
            videos
        } = this.props;

        return (
            <div className={cx(styles.block, styles.mobileBlock)}>
                <div className={styles.inner}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{title}</h2>
                        {body &&
                            <Markdown 
                                className={styles.body} 
                                source={body.body} 
                            />
                        }
                    </div>
                    
                    <div className={styles.media}>
                        {image &&
                            <Img 
                                className={cx(styles.media)}
                                fluid={image.fluid}
                                durationFadeIn={500}
                                title={image.title}
                                alt={image.title}
                                fadeIn
                            />
                        }
                    </div>
                </div>
            </div>
        )
        
    }
}

export default ContentPanel