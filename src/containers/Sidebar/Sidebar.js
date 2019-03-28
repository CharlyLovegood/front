import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { Link } from 'react-router-dom';
import SidebarComponent from './../../components/SidebarComponent/SidebarComponent';
import MenuBar from './../../components/MenuBar/MenuBar';


import styles from './styles.module.css';
import workerCode from '../sharedWorker';

function getCookie(name) {
	let matches = document.cookie.match(new RegExp(
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
		switch (event.data.retData) {
			case 'users_list':
				var user_id = getCookie('userID')
				
				// let i = Number(user_id)
				event.data.list.map(name => {
					var u = name.user_id
					if (u != user_id) {
						this.props.usersList(name.user_id, name.nick)
					}
				})
				break;
			case 'chats_list':
				console.log(event.data.list)
				event.data.list.map(dat => this.props.chatsList(dat.chat_id, dat.topic));
				break;
			default:
				break;
		}
	}

	componentDidMount() {
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
	}


    render() {
    	console.log(this.props.usr.users)
	    return (
			<aside className={styles["sidebar"]}>
				<MenuBar />
		    	{this.props.match.params.view == "chats" ?
		    		<h1>Chats</h1>
		    	:
		    		<h1>Users</h1>
		    	}

		    	{this.props.match.params.view == "chats" ? 
			    	this.props.cht.chats.map(chat => (
			                <Link key={chat.id} to={"/chats/chat_id=" + (chat.id)}>
				                <SidebarComponent onClick={this.activeItem} path={this.props.location.pathname.split('=')} id = {chat.id}
				                    {...chat}
				                />
			                </Link>
			        ))
		        :
			    	this.props.usr.users.map(user => (
			                <Link key={user.userId} to={"/users/user_id=" + (user.userId)}>
				                <SidebarComponent path={this.props.location.pathname.split('=')} id = {user.userId}
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

