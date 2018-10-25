//import styles from './index.css';
import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
	<style>
		form-input {
			padding: 10px 5px;
			display: flex;
		}

		.result {
			color: #ffb270;
			padding: 10px 0px;
		}

		input[type=submit] {
			visibility: collapse;
			flex-basis: 300px;
		}

		form {
			display: flex;
			width: 100%;
		    flex-direction: column;
		    margin-bottom: 5px;
		}
		}
	</style>
	<form>
		<form-input name="message_text" placeholder="Сообщение" slot="message-input">
			<span slot="icon"></span>
		</form-input>
	</form>
`;

class MessageForm extends HTMLElement {
	constructor () {
		super();
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = template;
	}
}

customElements.define('message-form', MessageForm);