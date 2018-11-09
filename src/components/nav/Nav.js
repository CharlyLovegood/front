import React, { Component } from 'react';

export class Nav extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const props = this.props;

		return (
			<nav>
				<img className="avatar" src="https://mycs.net.au/wp-content/uploads/2016/03/person-icon-flat.png" />
				<p>MyName</p>
			</nav>
		);
	}
}