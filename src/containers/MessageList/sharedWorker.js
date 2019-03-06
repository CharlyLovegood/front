export default ((self) => {
	const ports = [];
	self.addEventListener('connect', (event) => {
		const port = event.source;
		console.log('connect');
		ports.push(port);
		port.addEventListener('fetch', function(event) {
			console.log('fetch');
		});
		port.addEventListener('message', (event) => {
			console.log('message');
			console.log(event.data);
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
					.then(data => console.log(data))

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