import React from 'react'
import styles from './styles.module.css';

const SidebarComponent = (props) => {
	if (props.path[1] !== undefined && props.path[1] === props.id){
		return (
			<div className={styles.container}>
			<p className={styles.SidebarComponent_active}>{props.topic}{props.name}</p> 
			<div className={styles.triangle}></div>
			</div>
		)
	}
	else {
		return (
			<p className={styles.SidebarComponent}>{props.topic}{props.name}</p> 
		)
	}		
};

export default SidebarComponent;