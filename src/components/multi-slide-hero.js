import React, { Component, createRef } from 'react'
import * as Markdown from 'react-markdown'
import cx from 'classnames'

import styles from './multi-slide-hero.module.css'


class SlideHero extends Component {
    constructor(props) {
        super(props)

        this.image = createRef()
        this.nav = []
        this.state = {
            activeSlide: {},
            slides: [],
            fadingOut: false,
        }
    }

    componentDidMount() {
        this.setState({
            activeSlide: this.props.heroSlides[0],
            slides: this.props.heroSlides
        })
    }

    setRef = (ref) => {
        this.nav.push(ref);
    }

    navClickHandler = (slide) => {
        this.setState({
            fadingOut: true,
        })

        setTimeout(() => {
            this.setState({
                activeSlide: slide,
                fadingOut: false
            })
        }, 500)
    }

    render() {
        const { activeSlide, slides } = this.state
        const { title, slideImage, heroSlug } = activeSlide

        return (
            <div className={styles.block}>
                <div className={cx(styles.inner, {
                    [styles.fadingOut]: this.state.fadingOut
                })}>
                    {title &&
                        <Markdown className={styles.title} source={title.title} />
                    }

                    {slideImage &&
                        <img
                            ref={this.image}
                            className={cx(styles.image, {
                                [styles.topAlign]: activeSlide.pos === 'top',
                                [styles.centerAlign]: activeSlide.pos === 'center'
                            })}
                            src={slideImage.fluid.src}
                        />
                    }
                </div>

                <nav className={styles.nav}>
                    {slides && slides.map((s, i) => {
                        return <span
                            key={i}
                            href={`#${s.heroSlug}`}
                            ref={this.setRef}
                            className={cx(styles.navItem, {
                                [styles.isActive]: s.heroSlug === heroSlug
                            })}
                            onClick={() => this.navClickHandler(s)}
                        >
                                {s.heroSlug}
                        </span>
                    })}
                </nav>


            </div>
        )
    }
}

export default SlideHero;
