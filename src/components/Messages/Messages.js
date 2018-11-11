import React from 'react';
import Message from './Message/Message';

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