import React from 'react';

const MessagePage = (props) => (
  <div>ID задачи - {props.match.params.id}</div>
);

export default MessagePage;