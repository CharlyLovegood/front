import React, { Component } from 'react';

import {
	TextMes
} from './text-message';

import {
	FileMes
} from './file-message';


export class MesBox extends Component {
	constructor(props) {
		super(props);
		console.log(props.text);
		this.state = {
			messages: [],
			files: [],
			imageUrl: [],
			packet: []
		};
	}

	componentDidUpdate(prevProps) {
		var now = new Date();
		var time = now.toDateString();

		if (this.props.newMes != prevProps.newMes) {
			console.log('New Message');

			var newPack = {
				text: this.props.newMes,
				file: null,
				url: null,
				time:time,
				status: "..."
			}

			this.setState({
				packet: this.state.packet.concat([newPack])
			});

			var Pack = this.state.packet.concat([newPack]);

			var formData = new FormData();
			formData.append("text", this.props.newMes)

			fetch('http://localhost:3002/upload', {  
				    method: 'post',   
				    body: formData
				}).then(function(response) {
					console.log(response)
					Pack[Pack.length - 1]['status'] = "OK";
		            return Pack;
		        }).then(pack => this.setState({packet: Pack}))
		        .catch(function(err){ 
		        	console.log(err);
		        	Pack[Pack.length - 1]['status'] = "Error";
		        	return Pack;
		    	}).then(pack => this.setState({packet: Pack}));

		}
		if (this.props.newFile != prevProps.newFile) {
			console.log('New File');

			var file = this.props.newFile;

			this.readFile(file).then( function(resultic) {
				newPack = {
					text: '',
					file: file,
					url: resultic,
					time: time,
					status: "..."
				};
				return newPack;	
			}).then(newPack => this.setState( {packet: this.state.packet.concat([newPack])}, function() {
				var formData = new FormData();
				formData.append("file", file);
				console.log(this.state.packet);

				var Pack = this.state.packet;

				fetch('http://localhost:3002/upload', {  
					    method: 'post',   
					    body: formData
					}).then(function(response) {
						console.log(response);
						Pack[Pack.length - 1]['status'] = "OK";
			            return Pack;
			        }).then(pack => this.setState({packet: Pack}))
			        .catch(function(err){ 
			        	console.log(err);
			        	Pack[Pack.length - 1]['status'] = "Error";
			        	return Pack;
			    	}).then(pack => this.setState({packet: Pack}));
			}));
		}
	}

	readFile(file) {
        let fileReader = new FileReader();
        //console.log(file);

        return new Promise((resolve, reject) => {
            fileReader.onload = e => {
                let dataURI = e.target.result;
                //console.log(dataURI);
                resolve(dataURI);
            }
            fileReader.onerror = () => reject('Ошибка чтения файла');
            fileReader.readAsDataURL(file); 
        })
	}

	render() {
		return (
			<div className="content">
				<message-box>
					<TextMes text="hello!" reciever="mesForMe" />


					{this.state.packet.map((item, index) => {
						if (item.text != '') {
							return (<TextMes time={item.time} text={item.text} key={index} status={item.status} reciever="myMes" />)
						}
						else {
							return (<FileMes time={item.time} imageUrl={item.url} key={index} status={item.status} reciever="myMes" />)
						};
					}) }
				</message-box>
			</ div>
		);
	}
}
