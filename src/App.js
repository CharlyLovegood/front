import React, { Component } from 'react';
// import Layout from './components/Layout/Layout';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import MessageList from './containers/MessageList/MessageList';
import AddMessage from './containers/AddMessage/AddMessage';
import Navbar from './containers/Navbar/Navbar';
import Sidebar from './containers/Sidebar/Sidebar';
import Centrifuge from './containers/Centrifuge/Centrifuge';
import Profile from './containers/Profile/Profile';


import {connect} from 'react-redux';
import * as actions from './store/actions';


import  { Redirect } from 'react-router-dom'


function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

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


class App extends Component {

  render() {
    // deleteCookie('token');
    // deleteCookie('userID');

    var userId = getCookie('userID');
    console.log(userId);


    if (userId == undefined) { 
      return (
        <Router>
          <div className="authcontainer">
            <p>Please Log In</p>
            <a href="http://127.0.0.1:5000/" className="auth"> LOG </a>
          </div>
        </Router>
        )
    }
    else {
    return (
        <Router>
            <div id="container">
            <Navbar />
            <main id="mainbody">
                    <Route path='/:view' component={Sidebar} />
                    <div id="main">
                        <Route path='/chats/chat_id=:num' component={Centrifuge} />
                        
                        <Route exact path='/users/user_id=:user_id' component={ (props) => <Profile {...props} />}/>

                        <Route exact path='/chats/chat_id=:chat_id' component={ (props) => <MessageList {...props} />}/>
                        <Route path='/chats/chat_id=:chat_id' component={AddMessage}    />
                    </div>
            </main>
            </div>
        </Router>
    )
    }
  }
}

const mapStateToProps = state => {
  return {
    usr: state.usr
  }
};

const mapDispatchToProps = (dispatch) => {
  return  {
    currentUser: (userId, userName, isAuthorized) => dispatch(actions.currentUser(userId, userName, isAuthorized))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
