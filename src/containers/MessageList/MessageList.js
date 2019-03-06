import React, { Component } from 'react';
import Message from './../../components/Message/Message';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { withRouter } from "react-router-dom";
import Emoji from './../../components/Emoji/Emoji';



import workerCode from './sharedWorker';

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
		this.state.worker.then((worker) => {
			worker.port.postMessage('message');
		});

	}

	onMessage(message) {
		this.state.worker.then((worker) => {
			worker.port.postMessage(message);
		});
		this.setState({messages: this.state.messages.concat(message)});
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
		console.log(event.data);
	}


	componentDidMount() {

		var request = new Request('http://127.0.0.1:5000/search_users/', {
		    method: 'GET', 
		    headers: {
				'Access-Control-Allow-Origin':'*'
			},
		});

		fetch(request)
				.then(function(response)  {
					return response.json();
				})
				.then(data => this.setState({ data }))

		var data = {
				jsonrpc: '2.0', 
				method: 'messages_list_by_chart', 
				params: {"chat_id": this.props.match.params.chat_id}, 
				id: '1',
		};

		var request = {
		    method: 'POST',
		    body: JSON.stringify(data),
		    headers: {
				'Access-Control-Allow-Origin':'*',
				"Content-Type": "application/json",
			},

		};

		fetch('http://127.0.0.1:5000/api',request)
				.then(function(response)  {
					return response.json();
				})
				.then(data => {
					console.log(data);
					data.map(mes => {
						if (mes[4] == getCookie('userID')) {
							var reciever = 'Me';
						}
						else {
							var reciever = "ForMe";
						}
						this.props.AddMessage(mes[0], reciever, this.props.match.params.chat_id, null, null, mes[5])
					})
				})
	}	

	componentDidUpdate(prevProps, prevState, snapshot) {

		if (this.props.match.params.chat_id !== prevProps.match.params.chat_id) {
			this.props.RemoveMessage()
			var data = {
				jsonrpc: '2.0', 
				method: 'messages_list_by_chart', 
				params: {"chat_id": this.props.match.params.chat_id}, 
				id: '1',
			};

			var request = {
			    method: 'POST',
			    body: JSON.stringify(data),
			    headers: {
					'Access-Control-Allow-Origin':'*',
					"Content-Type": "application/json",
				},

			};

			fetch('http://127.0.0.1:5000/api',request)
				.then(function(response)  {
					return response.json();
				})
				.then(data => {
					console.log(data);
					data.map(mes => {
						if (mes[4] == getCookie('userID')) {
							var reciever = 'Me';
						}
						else {
							var reciever = "ForMe";
						}
						this.props.AddMessage(mes[0], reciever, this.props.match.params.chat_id, null, null, mes[5])
					})
				})
		}		
	}

	handleEmoji(txt) {
		if (txt.indexOf("::") === -1) {
			return {__html: txt};
		}
		if (txt.indexOf("::") !== -1) {
			var re = /::(\w+)::/gi;
			var newstr = txt.replace(re, '<i class="$1"></i>');			
			return {__html: newstr};
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