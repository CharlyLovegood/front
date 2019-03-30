import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";

import styles from './styles.module.css';



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



class AuthWindow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            value: '',
        };
    }

    // componentDidMount() {     
    // }   

    // componentDidUpdate(prevProps, prevState, snapshot) {
    // }




    render() {
        const avatarLabelURL = require("../../icons/user1.png");
        return(
                <div className={styles["authcontainer"]}>
                    <p>Please Log In</p>
                    <a href="http://127.0.0.1:5000/" className={styles["auth"]}> LOG </a>
                </div>
        );
    };
}

// const mapStateToProps = state => {
//   return {
//     usr: state.usr
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return  {
//     currentUser: (userId, userName, isAuthorized) => dispatch(actions.currentUser(userId, userName, isAuthorized)),
//   }
// };


export default AuthWindow;