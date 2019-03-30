import React, { Component } from 'react';

import styles from './styles.module.css';


class AuthWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            value: '',
        };
    }

    render() {
        return(
                <div className={styles.authcontainer}>
                    <p>Please Log In</p>
                    <a href="http://127.0.0.1:5000/" className={styles.auth}> LOG </a>
                </div>
        );
    };
}


export default AuthWindow;