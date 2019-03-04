import React from 'react';
import * as actions from '../../store/actions'


const emoji = props => {
  return (
    <i className={props.type} onClick={() => {props.on(props.type)}}></i>
  );
}

const mapStateToProps = state => {
  return {
    msg: state.msg
  }
};

const mapDispatchToProps = (dispatch) => {
  return  {
  	AddEmoji: (emojiCode) => dispatch(actions.addEmoji(emojiCode))
  }
};

export default emoji;