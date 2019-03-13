export default ((self) => {
	const ports = [];
	self.addEventListener('connect', (event) => {
		const port = event.source;
		ports.push(port);
		port.addEventListener('message', (event) => {
			console.log(event.data);
			switch (event.data.reqData) {
				case 'get_messages':
					console.log('MESSAGES!')
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
								console.log(answ);
								// port.postMessage(data);
							})

				case 'create_chat':
					
					console.log(event.data)
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
								console.log(data);
								var answ = {
									retData: 'user_info',
									list: data
								};
								port.postMessage(answ);
								console.log(answ);
							})	
				case 'post_message':
					console.log('create message')
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

				case 'users_list':
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
							.then(data => {
								var answ = {
									retData: 'users_list',
									list: data
								};
								console.log(data)
								port.postMessage(answ);
								console.log(answ);
							})
					break;
				case 'chats_list':
					var data = {
							jsonrpc: '2.0', 
							method: 'search_chats', 
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
					console.log('empty req data');
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