import React from 'react'
import styles from './good-person.module.css'

const GoodPerson = () => {
    return (
        <div className={styles.block}>
            <div className={styles.media}>
                <img className={styles.image} src="https://placehold.it/300x300" alt=""/>
            </div>
            <div className={styles.body}>
                <h3 className={styles.title}>Mercer Brockenbrough</h3>
                <div className={styles.text}>
                    <p>As a successful Special Events Planning and Management professional, Mercer has a unique blend of experience working with high-profile artits, promoting the work of charitable causes and organizing domestic and international events and appearances. Throughout her career, Mercer has created and implemented strategies to build awareness execute eventsa, and manage operations of small to large-scale campaigns, </p>
                    <p>As a successful Special Events Planning and Management professional, Mercer has a unique blend of experience working with high-profile artits, promoting the work of charitable causes and organizing domestic and international events and appearances. Throughout her career, Mercer has created and implemented strategies to build awareness execute eventsa, and manage operations of small to large-scale campaigns, </p>
                </div>
            </div>
        </div>
    )
}

export default GoodPerson;
