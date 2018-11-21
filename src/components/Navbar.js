import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';


const Navbar = ({ users }) => (
  <nav id="navbar" className="navbar">
    <img alt="" className="avatar" src="https://mycs.net.au/wp-content/uploads/2016/03/person-icon-flat.png" />
    <p>MyName</p>
      <div className="dropdown-menu">
        <img alt="" className="menu-label" src="https://cdn0.iconfinder.com/data/icons/web-kit/100/Web-18-512.png" />
        <div className="menu-list">
          <Link to='/chats'>Chats</Link>
          <Link to='/users'>Users</Link>
        </div>
      </div>
  </nav>
)

Navbar.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }).isRequired),
}

export default Navbar