import React from 'react';
import styles from './styles.module.css';

const emoji = props => {
  return (
    <i className={styles[props.type] + ' ' + styles.emoji} onClick={() => {props.on(props.type)}}></i>
  );
}

export default emoji;