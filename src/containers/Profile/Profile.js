import React, { Component } from 'react';
import Message from './../../components/Message/Message';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { withRouter } from "react-router-dom";
import ProfileCreateChatComponent from './../../components/ProfileCreateChatComponent/ProfileCreateChatComponent';


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
		    value: ''
		};
	}

    handleChange(event) {
      console.log(event.target.value);
      this.setState({value: event.target.value}) 
    };

	componentDidMount() {
		console.log(this.props.match.params.user_id);
		var data = {
				jsonrpc: '2.0', 
				method: 'get_user_info', 
				params: {"user_id": this.props.match.params.user_id}, 
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
					data.map((dat) => this.setState({data: [dat[0], dat[2]]}));
					
				})
				
	}	

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.match.params.user_id !== prevProps.match.params.user_id) {
			console.log(this.props.match.params.user_id);
			console.log(prevProps.match.params.user_id);
			var data = {
					jsonrpc: '2.0', 
					method: 'get_user_info', 
					params: {"user_id": this.props.match.params.user_id}, 
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
						data.map((dat) => this.setState({data: [dat[0], dat[2]]}));
					})	
		}	
	}

	handleCreateChat(event) {
		if (this.state.value !== '') {
			event.preventDefault();
			console.log(this.state.value);
			var data = {
					jsonrpc: '2.0', 
					method: 'create_pers_chat', 
					params: {"user_id_reciever": this.props.match.params.user_id, "user_id_sender": getCookie('userID'), "topic": this.state.value}, 
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
					})
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageList));