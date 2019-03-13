import React, { Component } from 'react';
import Message from './../../components/Message/Message';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { withRouter } from "react-router-dom";
import ProfileCreateChatComponent from './../../components/ProfileCreateChatComponent/ProfileCreateChatComponent';


import workerCode from '../sharedWorker';

function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}


class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
		    data: [],
		    value: '',
		    worker: this.getSharedWorker()
		};
	}

	getSharedWorker () {
		const workerFile = new Blob([`(${workerCode})(self)`], {type: 'text/javascript'});
		return new Promise((res, rej) => {
			const reader = new FileReader();
			reader.addEventListener('loadend', (event) => {
			const worker = new SharedWorker(event.target.result);
			worker.port.addEventListener('message', this.onWorkerList.bind(this));
			worker.port.start();
			window.addEventListener('beforeunload', () => {
				worker.port.postMessage('disconnect');
			});
			res(worker);
			});
			reader.addEventListener('error', rej);
			reader.readAsDataURL(workerFile);
		});
	}

	onWorkerList (event) {
		console.log(event.data);

		switch (event.data.retData) {
			case 'user_info':
				console.log('hhhhhh========')
				console.log(event.data.list);
				this.setState({data: [event.data.list.name, event.data.list.user_id]})
				break;
			default:
				console.log('empty');
				break;
		}
	}


    handleChange(event) {
	    console.log(event.target.value);
	      this.setState({value: event.target.value}) 
	    };


	componentDidMount() {
		console.log(this.props.match.params.user_id);
		var req = {
			userId: this.props.match.params.user_id,
			reqData: 'get_user_info'
		}
		this.state.worker.then((worker) => {
			worker.port.postMessage(req);
		});
				
	}	

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.user_id !== prevProps.match.params.user_id) {
			var req = {
				userId: this.props.match.params.user_id,
				reqData: 'get_user_info'
			}
			this.state.worker.then((worker) => {
				worker.port.postMessage(req);
			});
		}	
	}


	handleCreateChat(event) {
		if (this.state.value !== '') {
			event.preventDefault();
			console.log(this.state.value);
			var userId = getCookie('userID');

			var req1 = {
				topic: this.state.value,
				userIdReciever: userId,
				userIdSender: this.props.match.params.user_id,
				reqData: 'create_chat'
			}

			this.state.worker.then((worker) => {
				worker.port.postMessage(req1);
			});

			this.setState({value: ''});		
		}
	}

	render() {
		return(
		    <section id="profile">		       
		        {this.state.data[0]} 
		        <ProfileCreateChatComponent value={this.state.value} handleCreateChat={(event) => this.handleCreateChat(event)} 
		        													handleChange={(event) => this.handleChange(event)}/>
		    </section>
		);
	};
}

const mapStateToProps = state => {
  return {
    usr: state.usr
  }
};

const mapDispatchToProps = (dispatch) => {
  return  {
    currentUser: (userId, userName, isAuthorized) => dispatch(actions.currentUser(userId, userName, isAuthorized)),
  }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));