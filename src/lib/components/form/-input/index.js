import styles from './index.css';
import shadowStyles from './shadow.css';

const template = `
	<style>
		input {
			border: 0;
			outline: none;
			width: calc(100% - 2px);
			font-size: 28px;
		}

		:host {
			display: inline-block;
			border: 1px solid rgba(25, 25, 25, 0.32);
		}

		img {
			height: 27px;
		}

		button {
			padding: 4px 5px 0px 8px;
		    background: white;
		    border: none;
		}

		.attachButton {
			margin: 5px 5px 0px 15px;
		}
		.attachButton:focus {
		}	
	</style>
	<input type="text">
	<button id="submit">
		<img src="https://icon-icons.com/icons2/933/PNG/512/send-button_icon-icons.com_72565.png">
	</button>
	<label for="attach" class="attachButton">
		<img src="https://cdn.icon-icons.com/icons2/933/PNG/512/attachment-clip_icon-icons.com_72870.png">
	</label>
	<input type="file" id="attach" name="input" style="display: none">
	<button id="geoposition">
		<img src="https://cdn4.iconfinder.com/data/icons/contact-and-address-1/32/contact-05-512.png">
	</button>
`;

//const iconTemplate = `
//	<div class="${styles.icon}" />
//`;


class FormInput extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
		this._initElements();
		this._addHandlers();
	}

	static get observedAttributes() {
		return [
			"name",
			"placeholder",
			"value",
			"disabled"
		]
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		this._elements.input[attrName] = newVal;
	}

	_initElements () {
		var hiddenInput = document.createElement('input');
		var input = this.shadowRoot.querySelector('input');
		var button = this.shadowRoot.querySelector('button');
		var geoButton = this.shadowRoot.getElementById('geoposition');

		this.appendChild(hiddenInput);
		this._elements = {
			button: button,
			input: input,
			hiddenInput: hiddenInput,
			geoButton: geoButton
		};
	}

	_addHandlers () {
		this._elements.input.addEventListener('input', this._onInput.bind(this));
		this._elements.button.addEventListener('click', this._onInput.bind(this));
		this._elements.geoButton.addEventListener('click', this._geoposition.bind(this));
	}

	_geoposition() {

		function error() {
			alert('Error: Position hasn`t been detected');
		}
		function getPosition (opts) {
			return new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, error, opts);
			});
		}
		getPosition().then((position) => this._fillForm(position.coords));
	}

	_fillForm(fill) {
		var latitude  = fill.latitude;
    	var longitude = fill.longitude;
		this._elements.input.value = 'Latitude is ' + latitude + '° Longitude is ' + longitude;;
	}
	
	_onInput () {
		this._elements.hiddenInput.value = this._elements.input.value;
	}
}

customElements.define('form-input', FormInput);