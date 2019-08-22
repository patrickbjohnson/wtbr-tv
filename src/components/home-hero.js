import React, { Component, createRef } from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import cx from 'classnames'
import Player from '@vimeo/player'
import styles from './home-hero.module.css'

const key = 'F9BF40A7-583F4D86-94FB5B6D-77C600ED'

class HomeHero extends Component {
    constructor(props) {
        super(props)
        this.SCROLL_SPEED = 1000
        this.contentRefs = []
        this.api = null
        this.video = createRef()
        this.player = null
        this.state = {
            isLast: null,
            activePanel: null,
            sections: [
                {
                    text: ""
                },
                {
                    text: this.props.videoHeroTitle
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
    
    componentDidMount() {
        const { videoId } = this.props
        
        this.player = new Player(this.video.current, {
            id: videoId,
            width: '100%',
            autoplay: true,
            title: false,
            muted: true,
            loop: true,
            controls: false,
            background: true,
        });
    }


    render() {
        const slides = this.state.sections
        const lastSlide = slides[slides.length - 1]
        return (
            <div className={styles.block}>
                <div className={styles.videoWrapper} ref={this.video}></div>
                {!this.state.isLast &&
                    <ReactFullpage
                        licenseKey={key}
                        sectionsColor={[]}
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