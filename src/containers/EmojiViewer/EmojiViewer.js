import React, { PureComponent } from 'react';

import Emoji from './../../components/Emoji/Emoji';

import styles from './styles.module.css';

class EmojiViewer extends PureComponent {
	render() {
		return(
			<section className={styles.emoji_viewer}>
				<Emoji type='smile' on={this.props.handleEmojiClick}/>
				<Emoji type='laugh' on={this.props.handleEmojiClick}/>
				<Emoji type='kiss' on={this.props.handleEmojiClick}/>
				<Emoji type='love' on={this.props.handleEmojiClick}/>
				<Emoji type='cry' on={this.props.handleEmojiClick}/>
				<Emoji type='angry' on={this.props.handleEmojiClick}/>
				<Emoji type='pout' on={this.props.handleEmojiClick}/>
				<Emoji type='checks' on={this.props.handleEmojiClick}/>
				<Emoji type='fear' on={this.props.handleEmojiClick}/>
			</section>
		);
	}
}


export default EmojiViewer