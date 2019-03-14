import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'

import BrowserSprite from 'svg-baker-runtime/src/browser-sprite';
import globalSprite from 'svg-sprite-loader/runtime/sprite';

import Emoji from './../../components/Emoji/Emoji';



class EmojiViewer extends Component {
	render() {
		return(
			<section id="emoji-viewer">
				<Emoji type="smile" on={this.props.handleEmojiClick}/>
				<Emoji type="laugh" on={this.props.handleEmojiClick}/>
				<Emoji type="kiss" on={this.props.handleEmojiClick}/>
				<Emoji type="love" on={this.props.handleEmojiClick}/>
				<Emoji type="cry" on={this.props.handleEmojiClick}/>
				<Emoji type="angry" on={this.props.handleEmojiClick}/>
				<Emoji type="pout" on={this.props.handleEmojiClick}/>
				<Emoji type="checks" on={this.props.handleEmojiClick}/>
				<Emoji type="fear" on={this.props.handleEmojiClick}/>
			</section>
		);
	}
}



const mapDispatchToProps = (dispatch) => {
  return  {
  	AddEmoji: (emojiCode) => dispatch(actions.addEmoji(emojiCode))
  }
};

const mapStateToProps = state => {
  return {
    msg: state.msg
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(EmojiViewer)