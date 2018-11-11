import React from 'react';
import { withRouter } from 'react-router-dom'

const message = ({message}) => {
  return (
    <div className={message.reciever} key={message.id}>
    	<p>{message.text}</p>
    	<img alt="" src={message.url} />
    </div>
  )
};

export default withRouter(message);