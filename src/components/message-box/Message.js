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

		};
	}

	componentDidUpdate(prevProps) {

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
			<message-box>
				{this.state.data.map((item, index) => {
					if data.text != null 
				return (
					<FileMes imageUrl={item} key={index} reciever="myMes" />
				)}) }

				{this.state.messages.map((item, index) => {
				return (
					<TextMes text={item} key={index} reciever="myMes" />
				)}) }

			</message-box>
		);
	}
}