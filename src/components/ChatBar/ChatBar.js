import React from 'react';
import styles from './styles.module.css';

const chatBar = (props) => (
    <div className={styles.chatBar}>
        <img alt='' className={styles.menu_label} src={require('../../icons/user1.png')} />
        <p>{props.member.name}</p>
    </div>
);

export default chatBar;