import React, { Component } from 'react';
// import  from './../../components/Avatar/Avatar';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { Link } from 'react-router-dom';
import SidebarComponent from './../../components/SidebarComponent/SidebarComponent';

import workerCode from '../sharedWorker';

function getCookie(name) {
	var matches = document.cookie.match(new RegExp(
	    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}




class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
		    data: [],
		    worker: this.getSharedWorker()
		};
	};

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
			case 'users_list':
				console.log('USERS LIST');
				event.data.list.map(name => this.props.usersList(name[2], name[0]))
				break;
			case 'chats_list':
				console.log('Chats LIST');
				event.data.list.map(dat => this.props.chatsList(dat[1], dat[0]));
				break;
			default:
				console.log('empty');
				break;
		}
	}

	componentDidMount() {
		var userId = getCookie('userID');

		var req1 = {
			userId: userId,
			reqData: 'users_list'
		}

		this.state.worker.then((worker) => {
			worker.port.postMessage(req1);
		});

		var req2 = {
			userId: userId,
			reqData: 'chats_list'
		}
		this.state.worker.then((worker) => {
			worker.port.postMessage(req2);
		});
	}


    render() {
    	console.log(this.props.usr.users)
	    return (
			<aside id="sidebar" className="sidebar">
			    	{this.props.match.params.view == "chats" ?
			    		<h1>Chats</h1>
			    	:
			    		<h1>Users</h1>
			    	}

			    	{this.props.match.params.view == "chats" ? 
				    	this.props.cht.chats.map(chat => (
				                <Link key={chat.id} to={"/chats/chat_id=" + (chat.id)}>
					                <SidebarComponent
					                    {...chat}
					                />
				                </Link>
				        ))
			        :
				    	this.props.usr.users.map(user => (
				                <Link key={user.userId} to={"/users/user_id=" + (user.userId)}>
					                <SidebarComponent
					                    {...user}
					                />
				                </Link>
				        ))
			    	}
			</aside>
	    );
    };
}

const mapDispatchToProps = (dispatch) => {
  return  {
    usersList: (userId, name) => dispatch(actions.usersList(userId, name)),
    chatsList: (id, topic) => dispatch(actions.chatList(id, topic))
  }
};

const mapStateToProps = state => {
  return {
    usr: state.usr,
    cht: state.cht
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

