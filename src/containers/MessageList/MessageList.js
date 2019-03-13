import React, { Component } from 'react';
import Message from './../../components/Message/Message';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { withRouter } from "react-router-dom";
import Emoji from './../../components/Emoji/Emoji';

import workerCode from '../sharedWorker';

function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}



class MessageList extends Component {
	constructor(props) {
		super(props);

		this.state = {
		    data: [],
		    user: 0,
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
		if (event.data.retData === 'messages_list') {
			console.log(event.data)
			event.data.list.map(mes => {
				if (mes.author == getCookie('userID')) {
					var reciever = 'Me';
				}
				else {
					var reciever = "ForMe";
				}
				this.props.AddMessage(mes.content, reciever, this.props.match.params.chat_id, null, null, mes.added_at)
			});
		}
	}


	componentDidMount() {
		var req1 = {
			chatId: this.props.match.params.chat_id,
			reqData: 'get_messages'
		}
		this.state.worker.then((worker) => {
			worker.port.postMessage(req1);
		});
	}	

	componentDidUpdate(prevProps, prevState, snapshot) {

		if (this.props.match.params.chat_id !== prevProps.match.params.chat_id) {
			console.log('remove messages')
			this.props.RemoveMessage()
			var req2 = {
				chatId: this.props.match.params.chat_id,
				reqData: 'get_messages'
			}
			this.state.worker.then((worker) => {
				worker.port.postMessage(req2);
			});


		}
				
	}

	handleEmoji(txt) {
		if (txt !== undefined) {
			if (txt.indexOf("::") === -1) {
				return {__html: txt};
			}
			if (txt.indexOf("::") !== -1) {
				var re = /::(\w+)::/gi;
				var newstr = txt.replace(re, '<i class="$1"></i>');			
				return {__html: newstr};
			}
		}
	}
	

	render() {
		return(
		    <section id="messages-list">		       
		        <ul>
		            {this.props.msg.messages ? this.props.msg.messages.map(message => (
		                <Message handleEmoji={this.handleEmoji}
		                    key={message.id}
		                    {...message}
		                />
		        )) : console.log('jjh')}
		        </ul>
		    </section>
		);
	};
}

const mapStateToProps = state => {
  return {
    msg: state.msg,
    usr: state.usr
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