import React, {Component} from 'react';
import Message from './../../components/Message/Message';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { withRouter } from "react-router-dom";

import ChatBar from './../../components/ChatBar/ChatBar';

import styles from './styles.module.css';
import workerCode from '../sharedWorker';

import {getCookie} from '../cookie'

class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
		    data: [],
		    user: 0,
		    chat_member: [],
		    worker: this.getSharedWorker()
		};
	}

	getSharedWorker () {
		const workerFile = new Blob([`(${workerCode})(self)`], {type: 'text/javascript'});
		return new Promise((res, rej) => {
			const reader = new FileReader();
			reader.addEventListener('loadend', (event) => {
				const worker = new SharedWorker(event.target.result);
				worker.port.addEventListener('message', this.onWorkerMessageList.bind(this));
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

	onWorkerMessageList (event) {
		if (event.data.retData === 'chat_member_info') {
			this.setState({chat_member: event.data.list}) 
		}
		if (event.data.retData === 'messages_list') {
			event.data.list.map(mes => {
				let reciever = "";
				mes.author == getCookie('userID') ? reciever = 'Me' : reciever = "ForMe";
				this.props.AddMessage(mes.content, reciever, this.props.match.params.chat_id, null, null, mes.added_at)
			});
		}
	}


	componentDidMount() {
		this.props.RemoveMessage();
		this.props.msg.messages = [];
		let req1 = {
			chatId: this.props.match.params.chat_id,
			reqData: 'get_messages'
		}
		this.state.worker.then((worker) => {
			worker.port.postMessage(req1);
		});

		let req3 = {
			chatId: this.props.match.params.chat_id,
			userId: getCookie('userID'),
			reqData: 'get_chat_member_info'
		}
		this.state.worker.then((worker) => {
			worker.port.postMessage(req3);
		});
	}	

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.chat_id !== prevProps.match.params.chat_id) {
			this.props.msg.messages = [];
			this.props.RemoveMessage();

			let req2 = {
				chatId: this.props.match.params.chat_id,
				reqData: 'get_messages'
			}
			this.state.worker.then((worker) => {
				worker.port.postMessage(req2);
			});

			let req4 = {
				chatId: this.props.match.params.chat_id,
				userId: getCookie('userID'),
				reqData: 'get_chat_member_info'
			}
			this.state.worker.then((worker) => {
				worker.port.postMessage(req4);
			});
		}
				
	}

	handleEmoji(txt) {
		if (txt !== undefined) {
			if (txt.indexOf("::") === -1) {
				return {__html: txt};
			}
			if (txt.indexOf("::") !== -1) {
				let re = /::(\w+)::/gi;
				let newstr = txt.replace(re, ' <i class="$1"></i> ');			
				return {__html: newstr};
			}
		}
	}
	

	render() {
		return(
		    <section className={styles.messages_list}>
		    	<ChatBar member={this.state.chat_member}/>		       
		        <div className={styles.messages_box}>
		            {this.props.msg.messages ? this.props.msg.messages.map(message => (
		                <Message handleEmoji={this.handleEmoji}
		                    key={message.id}
		                    {...message}
		                />
		        )) : console.log('')}
		        </div>
		    </section>
		);
	};
}

const mapStateToProps = state => {
    return {
        msg: state.msg,
        currentUsr: state.usr.currentUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return  {
    	AddMessage: (message, author, chatId, filename, url, date) => dispatch(actions.addMessage(message, author, chatId, filename, url, date)),
        currentUser: (userId, userName, isAuthorized) => dispatch(actions.currentUser(userId, userName, isAuthorized)),
    	RemoveMessage: () => dispatch(actions.removeMessage()),
  
    }
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageList));