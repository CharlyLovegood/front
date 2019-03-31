import React, { Component } from 'react';
// import Layout from './components/Layout/Layout';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import MessageList from './containers/MessageList/MessageList';
import AddMessage from './containers/AddMessage/AddMessage';
import Navbar from './containers/Navbar/Navbar';
import Sidebar from './containers/Sidebar/Sidebar';
import Centrifuge from './containers/Centrifuge/Centrifuge';
import Profile from './containers/Profile/Profile';
import AuthWindow from './containers/AuthWindow/AuthWindow';

import {connect} from 'react-redux';
import * as actions from './store/actions';


import {getCookie} from './containers/cookie'
import {setCookie} from './containers/cookie'



import firebase from 'firebase';
const config = {
    apiKey: "AIzaSyBibrWw6b833N4ar2-wY5wIT3TT1IR_pyg",
    authDomain: "saharok-221817.firebaseapp.com",
    databaseURL: "https://saharok-221817.firebaseio.com",
    projectId: "saharok-221817",
    storageBucket: "saharok-221817.appspot.com",
    messagingSenderId: "406120965570"
};

firebase.initializeApp(config);

const initializePush = () => {
    const messaging = firebase.messaging();
    messaging
        .requestPermission()
        .then(() => {
            console.log('Permission is granted by user');
            return messaging.getToken();
        })
        .then(token => {
            console.log('FCM Token:', token);
        })
        .catch(error => {
            console.log('Error Occurred', error);
        });
}
initializePush();




class App extends Component {
    render() {
        setCookie('userID', 1)
        var userId = getCookie('userID');
        console.log(userId);

        if (userId === undefined) { 
            return (
                <Router>
                    <AuthWindow />
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
                                <Route path='/chats/chat_id=:chat_id' component={AddMessage} />
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
    return    {
        currentUser: (userId, userName, isAuthorized) => dispatch(actions.currentUser(userId, userName, isAuthorized))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);