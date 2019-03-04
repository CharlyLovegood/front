import React from 'react'

const message = (props) => {
	return (
		<p className={props.author} >
			<i>{props.author}</i> <i className="date">{props.date}</i>
			<div className="emoji-message" dangerouslySetInnerHTML={props.handleEmoji(props.message)} />
			
			<img alt="" src={props.url} />
		</p>
	)
};

export default message;