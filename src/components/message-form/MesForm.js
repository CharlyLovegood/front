import React, { Component } from 'react';
import {
	TextMes
} from '../message-box/text-message'

export class MesForm extends Component {
	constructor(props) {
		super(props);
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleFileUpload = this.handleFileUpload.bind(this);
	    this.fillForm = this.fillForm.bind(this);
	    this.state = {value: ''};
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.value);
		if (this.state.value != '') {
			this.props.updateData(this.state.value);
			console.log('you updated data');	
			this.setState({value: ''});		
		}
	}


	handleFileUpload(event) {
		event.preventDefault();
		let reader = new FileReader();
    	let file = event.target.files[0];
    	reader.readAsDataURL(file);
    	console.log(file);

		var extension = file.name.split('.').pop().toLowerCase();
				
		if (extension == 'png' || extension == 'jpg') {
			this.props.uploadFile(file);
		}
		else {
			this.props.updateData('File: ' + file.name + ', size: ' + file.size + ' Byte.');
		}
	}


	fillForm() {
		this.geoposition().then(result => this.setState({value: 'My Latitude is ' + result.coords.latitude}));
	}


	geoposition() {
		function error() {
			alert('Error: Position hasn`t been detected');
		};

		function getPosition (opts) {
			return new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, error, opts);
			});
		};
		return getPosition();
	}


	render() {
		const props = this.props;

		return (
			<message-form>
				<form onSubmit={this.handleSubmit} id="MesForm">
					<input type="text" onChange={this.handleChange} value={this.state.value} onSubmit={this.handleSubmit} placeholder="Сообщение" />
					<button id="submit">
						<img className="imgButton" src="https://icon-icons.com/icons2/933/PNG/512/send-button_icon-icons.com_72565.png"></img>
					</button>
					<label htmlFor="attach" className="attachButton">
						<img className="imgButton" src="https://cdn.icon-icons.com/icons2/933/PNG/512/attachment-clip_icon-icons.com_72870.png"></img>
					</label>
					<input type="file" style={{display: 'none'}} onChange={this.handleFileUpload} id="attach"/>
					<button id="geoposition" onClick={this.fillForm}>
						<img className="imgButton" src="https://cdn4.iconfinder.com/data/icons/contact-and-address-1/32/contact-05-512.png"></img>
					</button>
				</form>
			</message-form>
		);
	}
}