import React from 'react'
import styles from './styles.module.css';


const message = (props) => {
	return (
		<p className={styles[props.author]}>
			<i>{props.author}</i> <i className={styles.date}>{props.date}</i>
			<div className={styles.emoji_message} dangerouslySetInnerHTML={props.handleEmoji(props.message)} />
			<img alt="" src={props.url} />
		</p>
	)
};

export default message;