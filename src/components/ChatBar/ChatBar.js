import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const chatBar = (props) => (
    <div className={styles["chatBar"]}>
        <img alt="" className={styles["menu-label"]} src={require("../../icons/user1.png")} />
        <p>{props.member.name}</p>
    </div>
);

export default chatBar;