import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const menuBar = (props) => (
    <ul className={styles.menu_bar}>
        <Link to='/chats'>
            <img alt="" className={styles.menu_label} src={require("../../icons/chat-blobs.png")} />
        </Link>
        <Link to='/users'>
            <img alt="" className={styles.menu_label} src={require("../../icons/user-group.png")} />
        </Link>
        <Link to='/#'>
            <img alt="" className={styles.menu_label} src={require("../../icons/user-group.png")} />
        </Link>
        <Link to='/#'>
            <img alt="" className={styles.menu_label} src={require("../../icons/user-group.png")} />
        </Link>
    </ul>
);

export default menuBar;