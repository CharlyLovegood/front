import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { Link } from 'react-router-dom';
import SidebarComponent from './../../components/SidebarComponent/SidebarComponent';
import SearchField from './../../components/SearchField/SearchField';

import MenuBar from './../../components/MenuBar/MenuBar';

import styles from './styles.module.css';
import workerCode from '../sharedWorker';

import {getCookie} from '../cookie'

class Sidebar extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
		    value: '',
		    worker: this.getSharedWorker()
		};

		let userId = getCookie('userID');

		let req1 = {
			userId: userId,
			reqData: 'users_list'
		}

		this.state.worker.then((worker) => {
			worker.port.postMessage(req1);
		});

		let req2 = {
			userId: userId,
			reqData: 'chats_list'
		}
		this.state.worker.then((worker) => {
			worker.port.postMessage(req2);
		});
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
		switch (event.data.retData) {
			case 'users_list':
				const user_id = getCookie('userID')
				event.data.list.map(name => {
					const u = name.user_id
					if (Number(u) !== Number(user_id)) {
						this.props.usersList(name.user_id, name.nick)
					}
				})
				break;
			case 'chats_list':
				event.data.list.map(dat => this.props.chatsList(dat.chat_id, dat.topic));
				break;
			case 'found_users':
				event.data.list.result.map(data => this.props.usersList(data._source.user_id, data._source.nick));
				break;
			case 'found_chats':
				event.data.list.result.map(dat => this.props.chatsList(dat._source.chat_id, dat._source.topic));
				break;
			default:
				break;
		}
	}

	handleChange(event) {
		this.setState({value: event.target.value});
	};

	handleSubmit(event) {
		if (this.props.match.params.view === 'chats'){
			event.preventDefault();
			let userId = getCookie('userID');
			let req3 = {
				query: this.state.value,
				userId: userId,
				reqData: 'search_chats'
			};
			this.state.worker.then((worker) => {
				worker.port.postMessage(req3);
			});
		}
		if (this.props.match.params.view === 'users'){
			event.preventDefault();
			let userId = getCookie('userID');
			let req4 = {
				query: this.state.value,
				userId: userId,
				reqData: 'search_users'
			};
			this.state.worker.then((worker) => {
				worker.port.postMessage(req4);
			});
		}
		this.setState({value: ''});
	};


    render() {
	    return (
			<aside className={styles.sidebar}>
				<MenuBar />

		    	<SearchField handleSubmit={(event) => this.handleSubmit(event)} handleChange={(event) => this.handleChange(event)} value={this.state.value}/>

		    	{(this.props.match.params.view === 'chats' || this.props.match.params.view === '') ? 
			    	this.props.cht.map(chat => (
			                <Link key={chat.get('id')} to={'/chats/chat_id=' + (chat.get('id'))}>
				                <SidebarComponent onClick={this.activeItem} path={this.props.location.pathname.split('=')} id = {chat.get('id')}
				                    topic={chat.get('topic')}
				                />
			                </Link>
			        ))
		        :
			    	this.props.usr.get('users').map(user => (
			                <Link key={user.get('userId')} to={'/users/user_id=' + (user.get('userId'))}>
				                <SidebarComponent path={this.props.location.pathname.split('=')} id = {user.get('userId')}
				                    name={user.get('name')}
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
        chatsList: (id, topic) => dispatch(actions.chatList(id, topic)),
        removeChatList: () => dispatch(actions.removeChatList()),
        removeUsersList: () => dispatch(actions.removeUsersList())
    }
};

const mapStateToProps = state => {
    return {
        usr: state.usr,
        cht: state.cht
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

