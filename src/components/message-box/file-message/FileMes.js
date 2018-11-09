import React, { Component } from 'react';

export class FileMes extends Component {
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
				<div>
					<img src={props.imageUrl} />
				</div>
			</div>
		);
	}
}