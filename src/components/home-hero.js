import React, { Component } from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import cx from 'classnames'

import styles from './home-hero.module.css'

class HomeHero extends Component {
    constructor(props) {
        super(props)
        this.contentRefs = []
        this.api = null
        this.SCROLL_SPEED = 1000
        this.state = {
            isLast: null,
            activePanel: null,
            sections: [
                {
                    text: "Be good people.Make good things."
                },
                {
                    text: "A full service production company that believes in being good people and making good things."
                }
            ]
        }
    }

    setRef = (ref) => {
        this.contentRefs.push(ref);
    };

    onSectionLeave = (origin, destination, direction) =>  {
        const { isLast } = destination
        const leavingContent = this.contentRefs[origin.index]
        const enteringContent = this.contentRefs[destination.index]
        const fadeClass = 'fade-in-delay'

        this.setState({
            activePanel: destination.index
        })

        leavingContent.classList.remove(fadeClass)
        enteringContent.classList.add(fadeClass)

        if ( isLast ) {
            setTimeout(() => {
                this.setState({
                    isLast
                })
            }, this.SCROLL_SPEED * 2)

        }
    }

    afterLoadHanlder = (origin, destination, direction) => {
        const enteringContent = this.contentRefs[destination.index]
        const fadeClass = 'fade-in-delay'

        this.setState({
            activePanel: destination.index
        })

        setTimeout(() => {
            enteringContent.classList.add(fadeClass)
        }, 1000)
    }


    render() {
        const slides = this.state.sections
        const lastSlide = slides[slides.length - 1]
        return (
            <div className={styles.block}>
                <div className={styles.videoWrapper}>
                    <video autoPlay muted className={styles.video}>
                        <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                    </video>
                </div>
                {!this.state.isLast &&
                    <ReactFullpage
                        scrollingSpeed={this.SCROLL_SPEED}
                        easingcss3={'cubic-bezier(0.215, 0.61, 0.355, 1), 1.2s'}
                        afterLoad={this.afterLoadHanlder}
                        onLeave={this.onSectionLeave}
                        render={({ state, fullpageApi }) => {
                            this.api = fullpageApi
                          return (
                            <ReactFullpage.Wrapper>
                                {this.state.sections.map((section, i) => {
                                    return (
                                        <div className={cx('section', styles.section)} key={i} >
                                            <div className={styles.content} ref={this.setRef} >
                                                <p className={styles.title}>{section.text}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </ReactFullpage.Wrapper>
                          );
                        }}
                    />
                }

                {this.state.isLast &&
                    <div className={cx('section', styles.section, styles.singlePanel)}>
                        <div className={cx(
                            'display-immediate',
                            styles.content
                        )}>
                            <p className={styles.title}>{lastSlide.text}</p>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default HomeHero