import React, { Component } from 'react';
import cx from 'classnames'
import Markdown from 'react-markdown'
import styles from './accordion.module.css'

class Accordion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: {},
            accordion: props.set,
        }
    }

    clickHandler = (set) => {
        /**
         * If the set is the active one,
         * set to empty object so we can close the accordion
         */
        this.setState({
            active: set === this.state.active ? {} : set
        });
    }

    isActiveItem = (currentId) => {
        return this.state.active.id === currentId
    }

    render() {
        const set = this.state.accordion;
        
        const {
            alignment
        } = this.props

        return (
            <div className={cx(styles.accordion)}>
                {set && set.map(item => (
                    <div
                        className={cx(styles.item, {
                            [styles.isActive]: this.isActiveItem(item.id)
                        })}
                        key={item.id}
                    >
                        <div onClick={() => this.clickHandler(item)} className={styles.itemTitle}>
                            {item.title}
                            <div className={cx(styles.icon, {
                                [styles.isActive]: this.isActiveItem(item.id)
                            })}>
                                <svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'><path d='M9 7h7v2H9v7H7V9H0V7h7V0h2v7z' fillRule='evenodd' /></svg>
                            </div>
                        </div>

                        <Markdown className={cx(styles.body, {
                            'tal': alignment === 'Left',
                            'tac': alignment === 'Center',
                            'tar': alignment === 'Right'
                        })} source={item.description.description} />
                    </div>
                ))}
            </div>
        )
    }

}

export default Accordion
