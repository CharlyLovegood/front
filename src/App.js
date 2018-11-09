import React, { Component } from 'react';

import {
	Nav,
	MesBox,
	MesForm
} from './components/';

class App extends Component {
	constructor(props) {
		super(props);
		this.updateData = this.updateData.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.state = {
			text: 'hey',
			file: ''
		};
	}

	updateData(text) {
		console.log('updateData()');
		//console.log(text)
		this.setState({text});
		//console.log('App()');
		//console.log(this.state.text);
	}

	uploadFile(file) {
		this.setState({file});
	}



	render() {
		//console.log('rendering app');
		return (
			<div id="app">
				<Nav />
				<MesBox newMes={this.state.text} newFile={this.state.file} newUrl={this.state.imagePreviewUrl}/>
				<MesForm updateData={ this.updateData } uploadFile={ this.uploadFile }/>
			</div>		
		);
	}
}

export default App;

