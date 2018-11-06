import shadowStyles from './shadow.css';

const template = `
	<style>
		.myMes {
			background: #ffe1e1;
		    padding: 0px 10px;
		    margin-top: 10px;
		    margin-bottom: 10px;
		    align-self: flex-end;
		    max-width: 70%;
		}
		.mesForMe {
			background: #ffa084;
		    padding: 15px;
		    margin-top: 10px;
		    margin-bottom: 10px;
		    align-self: flex-start;
		    max-width: 70%;
		}
		img {
			width: 90%;
		    margin-top: 10px;
		    margin-bottom: 10px;
		    align-self: flex-end;
		}
		.status {
			position: relative;
		    left: -10px;
		    top: 0;
		    display: flex;
    		align-items: flex-start;
		}
		.time {
			margin: 7px;
			font-size: 12px;
    		margin: 8px 0px;
		}
	</style>
	<div class="mesForMe">Are you going to scarborough fair? Parsley, sage, rosemary & thyme. Remember me to one who lives there. She once was a true love of mine</div>
`;

const mesTempl = `
	<div>
	<div class="time"></div>
		<p></p>
	</div>

`

class MessageBox extends HTMLElement {
	constructor () {
		console.log('34');
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
		this._initElements();
		this._addHandlers();
	}

	_initElements () {
		var mesForm = document.querySelector('message-form');
		var input = document.querySelector('message-box');
		var form = mesForm.shadowRoot.querySelector('form');
		var forminp = mesForm.shadowRoot.querySelector('form-input');
		var submitButton = forminp.shadowRoot.getElementById('submit');
		var attachButton = forminp.shadowRoot.getElementById('attach');

		this._elements = {
			form: form,
			mesForm: mesForm,
			input: input,
			submitButton: submitButton,
			attachButton: attachButton,
			forminp: forminp
		};	
	}

	_addHandlers () {
		this._elements.forminp.addEventListener('keypress', this._onSubmitEnter.bind(this), true);
		this._elements.submitButton.addEventListener('click', this._onSubmit.bind(this));
		this._elements.attachButton.addEventListener('change', this._loadFileToServer.bind(this), false);
	}


	_onSubmitEnter(event) {

		var now = new Date();
		var time = now.toDateString();

		console.log('89');
		if (event.keyCode == 13) {
			var div = document.createElement('div');
			if (this._elements.form.elements[0].value) {
				var text = this._elements.form.elements[0].value;
				div.innerHTML = '<div class="status">...<p class="time"> ' + time + '</p> </div> <p>' + text + '</p>';
				div.className = 'myMes';
				this.shadowRoot.appendChild(div);
			}
			this._scroll();

			var formData = new FormData();
			var text = this._elements.form.elements[0].value;
			console.log(text)
			formData.append("text", text)
			console.log('hy')
			fetch('http://localhost:3002/upload', {  
			    method: 'post',   
			    body: formData
			}).then(function(response) {
	        	console.log('done');
	        	var div = document.querySelector('message-box').shadowRoot.lastElementChild;
	        	div.innerHTML = '<div class="status">' + '&#10004; <p class="time"> ' + time + '</p> </div> <p>' + text + '</p>';
	        	return response;
	        	
	        })
	        .catch(function(err){ 
	        	console.log(err);
	        	var div = document.querySelector('message-box').shadowRoot.lastElementChild;
	        	div.innerHTML = '<div class="status">' + '&#10008; <p class="time"> ' + time + '</p> </div> <p>' + text + '</p>';
	        });
	        console.log('end')

		}
	}


	_onSubmit(event) {
		var now = new Date();
		var time = now.toDateString();


		var div = document.createElement('div');
		if (this._elements.form.elements[0].value) {
			var text = this._elements.form.elements[0].value;
			div.innerHTML = '<div class="status">' + '... <p class="time"> ' + time + '</p> </div> <p>' + text + '</p>';
			div.className = 'myMes';
			this.shadowRoot.appendChild(div);
		}
		this._scroll();

		var formData = new FormData();
		var text = this._elements.form.elements[0].value;
		console.log(text)
		formData.append("text", text)

		fetch('http://localhost:3002/upload', {  
		    method: 'post',   
		    body: formData
		}).then(function(response) {
          console.log('done');
          var div = document.querySelector('message-box').shadowRoot.lastElementChild;
          div.innerHTML = '<div class="status">' + '&#10004; <p class="time"> ' + time + '</p> </div> <p>' + text + '</p>';
          return response;

        })
        .catch(function(err){ 
          console.log(err);
          var div = document.querySelector('message-box').shadowRoot.lastElementChild;
	      div.innerHTML = '<div class="status">' + '&#10008; <p class="time"> ' + time + '</p> </div> <p>' + text + '</p>';
        });
	}

	_scroll() {
		this.scrollTop = 9999;
	}


	_loadFileToServer(evt) {
		var place = this.shadowRoot;
		var files = evt.target.files;
		var reader = new FileReader();
		var f = files[0];


		reader.onload = (function (theFile) {
			return function(e) {
				var extension = f.name.split('.').pop().toLowerCase();
				
				if (extension == 'png' || extension == 'jpg') {
					var span = document.createElement('img');
					span.src = reader.result;
					place.appendChild(span);

				}
				else {
					var div = document.createElement('div');
					div.innerHTML = '<div class="status">' + '...' + '</div> <p>File: ' + f.name + ', size: ' + f.size + ' Byte.' + '</p>';
					div.className = 'myMes';
					place.appendChild(div);
				}
			};
		})(f);
		reader.readAsDataURL(f);

		var formData = new FormData();
		formData.append("file", f);

		fetch('http://localhost:3002/upload', {  
		    method: 'post',   
		    body: formData
		}).then(function(response) {
        	console.log('done');
        	var div = document.querySelector('message-box').shadowRoot.lastElementChild;
	    	div.innerHTML = '<div class="status">' + '&#10004;' + '</div> <p>File: ' + f.name + ', size: ' + f.size + ' Byte.' + '</p>';
        	return response;
        })
        .catch(function(err){ 
        	console.log(err);
        	var div = document.querySelector('message-box').shadowRoot.lastElementChild;
	    	div.innerHTML = '<div class="status">' + '&#10008;' + '</div> <p>File: ' + f.name + ', size: ' + f.size + ' Byte.' + '</p>';
        });

	}

}
customElements.define('message-box', MessageBox);