import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { withRouter } from "react-router-dom";
import ProfileCreateChatComponent from './../../components/ProfileCreateChatComponent/ProfileCreateChatComponent';

import styles from './styles.module.css';
import workerCode from '../sharedWorker';

import {getCookie} from '../cookie'


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
		switch (event.data.retData) {
			case 'user_info':
				this.setState({data: [event.data.list.name, event.data.list.user_id]})
				break;
			default:
				break;
		}
	}


    handleChange(event) {
	    this.setState({value: event.target.value}) 
	};


	componentDidMount() {
		console.log(this.props.match.params.user_id);
		let req = {
			userId: this.props.match.params.user_id,
			reqData: 'get_user_info'
		}
		this.state.worker.then((worker) => {
			worker.port.postMessage(req);
		});		
	}	

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.user_id !== prevProps.match.params.user_id) {
			let req = {
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
			let userId = getCookie('userID');

			let req1 = {
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
		const avatarLabelURL = require("../../icons/user1.png");
		return(
		    <section className={styles.profile}>	
		    	<img alt="" className={styles.avatar} src="https://cdn.dribbble.com/users/31664/screenshots/3225538/dribbble-meetup-mnemonic.gif" />
		        <h3>{this.state.data[0]}</h3>
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