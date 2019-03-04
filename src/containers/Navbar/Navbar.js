import React, { Component } from 'react';
// import  from './../../components/Avatar/Avatar';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { Link } from 'react-router-dom';



function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}


class Navbar extends Component {
  state = {
    value: ''
  };

  logOut(event){
    deleteCookie('token');
    deleteCookie('userID');
  }


  render() {
    return (
      <nav id="navbar" className="navbar">
        <img alt="" className="avatar" src="https://mycs.net.au/wp-content/uploads/2016/03/person-icon-flat.png" />
        <p></p>
        <p>{this.props.usr.currentUser.userName}</p>
          <div className="dropdown-menu">
            <img alt="" className="menu-label" src="https://cdn0.iconfinder.com/data/icons/web-kit/100/Web-18-512.png" />
            <div className="menu-list">
              <Link to='/chats'>Chats</Link>
              <Link to='/users'>Users</Link>
              <Link to='/' onClick={(event) => this.logOut(event)}>Log Out</Link>
            </div>
          </div>
      </nav>
    );
  };
}

const mapDispatchToProps = (dispatch) => {
  return  {
    usersList: (userId, name) => dispatch(actions.currentUser()),
    currentUser: (userId, userName, isAuthorized) => dispatch(actions.currentUser(userId, userName, isAuthorized))
  }
};

const mapStateToProps = state => {
  return {
    usr: state.usr
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);