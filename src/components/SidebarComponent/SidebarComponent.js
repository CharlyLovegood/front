import React from 'react'

const SidebarComponent = (props) => {
	return (
		<a className="SidebarComponent">{props.topic}{props.name}</a> 
	)
};

export default SidebarComponent;