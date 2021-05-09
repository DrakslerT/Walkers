import React, { Component }  from 'react';
import styles from './footer.module.css';

export default class Footer extends Component {
    render() {
        return (
            <div className={styles.all}>
                Dogs are cool. Be like dogs.
            </div>
        )
    }
}