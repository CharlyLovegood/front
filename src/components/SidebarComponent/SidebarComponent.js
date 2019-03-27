import React from 'react'
import styles from './styles.module.css';

const SidebarComponent = (props) => {
	if (props.path[1] !== undefined && props.path[1] == props.id){
		return (
			<div className={styles["container"]}>
			<a className={styles["SidebarComponent-active"]}>{props.topic}{props.name}</a> 
			<div className={styles["triangle"]}></div>
			</div>
		)
	}
	else {
		return (
			<a className={styles["SidebarComponent"]}>{props.topic}{props.name}</a> 
		)
	}		
};

export default SidebarComponent;