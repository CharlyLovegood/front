import React from 'react';
import { Link } from 'react-router-dom';

const header = () => (
  <nav>
	<img alt="" className="avatar" src="https://mycs.net.au/wp-content/uploads/2016/03/person-icon-flat.png" />
	<p>MyName</p>
    <div className="dropdown-menu">
      <img alt="" className="menu-label" src="https://cdn0.iconfinder.com/data/icons/web-kit/100/Web-18-512.png" />
      <div className="menu-list">
        <Link to='/main'>Main page</Link>
        <Link to='/chats'>Chats list</Link>
      </div>
    </div>
  </nav>
);


export default header;