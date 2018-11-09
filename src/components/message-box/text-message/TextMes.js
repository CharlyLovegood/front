import React, { Component } from 'react';

export class TextMes extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const props = this.props;

		return (
			<div className={props.reciever}>
				<div className="mesInfo">
					<div className="status">{props.status}</div>
					<div className="time">{props.time}</div>
				</div>
				<p>{props.text}</p>
			</div>
		);
	}
}