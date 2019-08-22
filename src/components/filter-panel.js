import React, { Component } from 'react'
import cx from 'classnames'
import styles from './filter-panel.module.css'

class FilterPanel extends Component {
    constructor(props) {
      super(props)

      this.state = {
        hover: null
      }
    }

    getColorScheme(color, hovered) {
      if(hovered) {
        return {
          backgroundColor: color || '#999',
          color: '#FFF'
        }
      } else {
        return {
          backgroundColor: '#000',
          color: color || '#FFF'
        }
      }
    }

    render() {
        const {
            categories,
            isOpen,
            refHandler,
            selectionHandler,
            panelHandler,
            resetHandler
        } = this.props

        const { hover } = this.state

        return (
            <div
                className={cx(
                    styles.filter,
                )}
                ref={refHandler}
            >
                {categories.map((cat, i) => {
                    const style = this.getColorScheme(cat.color, hover === cat.slug)

                    return (
                        <span
                            className={styles.filterItem}
                            style={style}
                            key={i}
                            onMouseOver={() => this.setState({ hover: cat.slug })}
                            onMouseOut={() => this.setState({ hover: null })}
                            onClick={() => selectionHandler(cat.slug)}>
                                {cat.title}
                        </span>
                    )
                })}
                <span
                    className={cx(styles.filterItem)}
                    onClick={() => {
                        resetHandler()
                        selectionHandler('*')
                    }}
                >
                    Reset
                </span>
                <span
                    className={cx(styles.filterItem, styles.filterControl, styles.resetFilter)}
                    onClick={() => panelHandler() }
                >
                    {isOpen ?
                        <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'><path d='M9.414 8l5.657 5.657-1.414 1.414L8 9.414l-5.657 5.657L.93 13.657 6.586 8 .929 2.343 2.343.93 8 6.586 13.657.929l1.414 1.414L9.414 8z'fill='#FFF' fillRule='evenodd' /></svg>
                    :
                        `Filter`
                    }
                </span>
            </div>
        )
    }
}

export default FilterPanel;
