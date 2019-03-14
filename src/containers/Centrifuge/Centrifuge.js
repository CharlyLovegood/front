import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import jwt from 'jsonwebtoken';
import Centrifuge from 'centrifuge';

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
};


class CentrifugeClass extends Component {
	componentDidMount() {
		console.log(this.props.match.params.num);
		const token = getCookie('token');
		let chanel = this.props.match.params.num;
		
		const centrifuge = new Centrifuge('ws://localhost:8000/connection/websocket');
		centrifuge.setToken(token);
		centrifuge.on('connect', () => {
			console.log('Centrifuge connected');
		});
		centrifuge.subscribe(chanel, msg => {
			console.log(msg);
			if (msg.data.user_id !== getCookie('userID')) {
				this.props.AddMessage(msg.data.Data, 'ForMe', 63, null, null)
			} 
		});
		centrifuge.connect();	
	}	

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.num != prevProps.match.params.num) {
			console.log(this.props.match.params.num);
			const token = getCookie('token');
			let chanel = this.props.match.params.num;

			const centrifuge = new Centrifuge('ws://localhost:8000/connection/websocket');
			centrifuge.setToken(token);
			centrifuge.on('connect', () => {
				console.log('Centrifuge connected');
			});
			centrifuge.subscribe(chanel, msg => {
				console.log(msg);
				if (msg.data.user_id !== getCookie('userID')) {
					this.props.AddMessage(msg.data.Data, 'ForMe', 63, null, null)
				}
			});
			centrifuge.connect();
		}
	}


	render() {
		return(
			<section />
		);
	}
}



const mapDispatchToProps = (dispatch) => {
  return  {
    AddMessage: (message, author, chatId, filename, url) => dispatch(actions.addMessage(message, author, chatId, filename, url))
  }
};

const mapStateToProps = state => {
  return {
    
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CentrifugeClass)