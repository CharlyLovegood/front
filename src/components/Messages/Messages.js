import React from 'react';
import classes from './Messages.module.css';
import Message from './Message/Message'

const messages = (props) => {
  
  let messageList = props.messages.map((message, index) => {
      return (
        <Message key={index} message={message}/>
      )
    }
  );
  return (
    <div className="message-box">
      {messageList}
    </div>
  )
};

export default messages;