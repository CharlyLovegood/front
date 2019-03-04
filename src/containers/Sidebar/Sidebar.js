import React, { Component } from 'react';
// import  from './../../components/Avatar/Avatar';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { Link } from 'react-router-dom';
import SidebarComponent from './../../components/SidebarComponent/SidebarComponent';


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
		    data: []
		};
	};

	componentDidMount() {
		var data = {
			jsonrpc: '2.0', 
			method: 'search_users', 
			params: {}, 
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
				.then(data => data.map(name => this.props.usersList(name[2], name[0])))
				.then(console.log(this.props.usr.users))
				

		var userId = getCookie('userID');

		var data = {
				jsonrpc: '2.0', 
				method: 'search_chats', 
				params: {"user_id": userId,"topic": ""}, 
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
				.then(data => data.map((dat) => this.props.chatsList(dat[1], dat[0])))
				.then(console.log(this.props.cht.chats))
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

