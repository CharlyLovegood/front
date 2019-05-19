import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import Centrifuge from 'centrifuge';

import {getCookie} from '../cookie'

class CentrifugeClass extends PureComponent {
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
		if (this.props.match.params.num !== prevProps.match.params.num) {
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
    currentUsr: state.usr.currentUser,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CentrifugeClass)