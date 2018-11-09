import React from 'react';
import classes from './Message.module.css';
import { Link, withRouter } from 'react-router-dom'

const message = ({message}) => {
  return (
    <div className={message.reciever} key={message.id}>
    	<p>{message.text}</p>
    	<img src={message.url} />
    </div>
  )
};

export default withRouter(message);