import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';



const Sidebar = ({ users, chats, show }) => (
  <aside id="sidebar" className="sidebar">
    <ul>
      {show=='users' ? users.map(user => (
        <Link key={user.id} to={"/users/user_id=" + (user.id)}>{user.userName}</Link>
      )):chats.map(chat => (
        <Link key={chat.id} to={'/chats/chat_id=' + chat.id}>{chat.chatName}</Link>
      ))}
    </ul>
  </aside>
)

Sidebar.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired),
  chats: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired)
}

export default Sidebar
