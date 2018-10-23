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
	</style>
	<div class="mesForMe">Are you going to scarborough fair? Parsley, sage, rosemary & thyme. Remember me to one who lives there. She once was a true love of mine</div>
`;

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
			attachButton: attachButton
		};	
	}

	_addHandlers () {
		this._elements.submitButton.addEventListener('click', this._onSubmit.bind(this));
		this._elements.attachButton.addEventListener('change', this._loadFile.bind(this), false);
	}

	_onSubmit(event) {
		var div = document.createElement('div');
		console.log('fsf');
		if (this._elements.form.elements[0].value) {
			var text = this._elements.form.elements[0].value;
			div.innerHTML = '<p>' + text + '</p>';
			div.className = 'myMes';
			this.shadowRoot.appendChild(div);
		}
		this._scroll();
	}

	_scroll() {
		this.scrollTop = 9999;
	}

	_loadFile(evt) {
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
					div.innerHTML = '<p>File: ' + f.name + ', size: ' + f.size + ' Byte.' + '</p>';
					div.className = 'myMes';
					place.appendChild(div);

				}
			};
		})(f);
		reader.readAsDataURL(f);
	
		this._scroll();
	}
}
customElements.define('message-box', MessageBox);