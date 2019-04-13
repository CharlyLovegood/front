export default ((self) => {
	const ports = [];
	self.addEventListener('connect', (event) => {
		const port = event.source;
		ports.push(port);
		port.addEventListener('message', (event) => {
			switch (event.data.reqData) {
				case 'search_users':
					var data = {
							jsonrpc: '2.0', 
							method: 'search_users', 
							params: {"user_id": event.data.userId, "query": event.data.query}, 
							id: '1'
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
								var answ = {
									retData: 'found_users',
									list: data
								};
								port.postMessage(answ);
							})	
					break;
				case 'search_chats':
					var data = {
							jsonrpc: '2.0', 
							method: 'search_chats', 
							params: {"user_id": event.data.userId, "query": event.data.query}, 
							id: '1'
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
								var answ = {
									retData: 'found_chats',
									list: data
								};
								port.postMessage(answ);
							})	
					break;
				case 'login_user':
					var data = {
							jsonrpc: '2.0', 
							method: 'check_user_password', 
							params: {"email": event.data.email, "password": event.data.password}, 
							id: '1'
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
								var answ = {
									retData: 'user_handle_login',
									list: data
								};
								port.postMessage(answ);
							})	
					break;				
				case 'create_user':
					var data = {
							jsonrpc: '2.0', 
							method: 'create_user', 
							params: {"nick": event.data.nick, "name": event.data.name, "email": event.data.email, "password": event.data.password}, 
							id: '1'
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
								var answ = {
									retData: 'user_handle_created',
									list: data
								};
								port.postMessage(answ);
							})	
					break;
				case 'get_current_user_info':
					var data = {
							jsonrpc: '2.0', 
							method: 'get_user_info', 
							params: {"user_id": event.data.userId}, 
							id: '1'
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
								var answ = {
									retData: 'current_user_info',
									list: data
								};
								port.postMessage(answ);
							})	
					break;
				case 'get_chat_member_info':
					var data = {
						jsonrpc: '2.0', 
						method: 'get_chat_member_info', 
						params: {"chat_id": event.data.chatId, "user_id": event.data.userId}, 
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
								var answ = {
									retData: 'chat_member_info',
									list: data
								};
								port.postMessage(answ);
							})
					break;
				case 'get_messages':
					var data = {
						jsonrpc: '2.0', 
						method: 'messages_list_by_chart', 
						params: {"chat_id": event.data.chatId}, 
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
								var answ = {
									retData: 'messages_list',
									list: data
								};
								port.postMessage(answ);
							})
					break;
				case 'create_chat':
					var data = {
							jsonrpc: '2.0', 
							method: 'create_pers_chat', 
							params: {"user_id_reciever": event.data.userIdReciever, "user_id_sender": event.data.userIdSender, "topic": event.data.topic}, 
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
					break;					
				case 'get_user_info':
					var data = {
							jsonrpc: '2.0', 
							method: 'get_user_info', 
							params: {"user_id": event.data.userId}, 
							id: '1'
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
								var answ = {
									retData: 'user_info',
									list: data
								};
								port.postMessage(answ);
							})	
					break;
				case 'post_message':
					var data = {
				          jsonrpc: '2.0', 
				          method: 'create_message', 
				          params: {"user_id_sender":  event.data.userId, "chat_id":  event.data.chatId, "content":  event.data.txt}, 
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
				            console.log(response);
				          })
				    break;      
				case 'users_list':
					var data = {
						jsonrpc: '2.0', 
						method: 'users_list', 
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
							.then(data => {
								var answ = {
									retData: 'users_list',
									list: data
								};
								port.postMessage(answ);
							})
					break;
				case 'chats_list':
					var data = {
							jsonrpc: '2.0', 
							method: 'chats_list', 
							params: {"user_id": event.data.userId, "topic": ""}, 
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
								var answ = {
									retData: 'chats_list',
									list: data
								};
								port.postMessage(answ);;
							});
					break;
				default:
					break;
			}
			if (event.data === 'disconnect') {
				ports.splice(ports.indexOf(event.target), 1);
			} else {
				ports.filter(port => port !== event.target).forEach((port) => {
					port.postMessage(event.data);
				});
			}
		});
		port.start();
	});
});