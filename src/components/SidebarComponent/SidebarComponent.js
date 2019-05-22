import React, { useState, useEffect } from 'react'
import styles from './styles.module.css';


function SidebarComponent(props) {
	const [style, setStyle] = useState(styles.triangle_none);
	useEffect(() => {
		setStyle(styles.triangle_none);
		if (props.path[1] == props.id) {
			setStyle(styles.triangle);
		}
	}, props.path[1]);


	return(
		<div className={styles.container}>
			<p className={styles.SidebarComponent_active}>{props.topic}{props.name}</p> 
			<div className={style}></div>
		</div>
	);
}


export default SidebarComponent;
