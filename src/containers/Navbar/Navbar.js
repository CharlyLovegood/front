import React, { Component } from 'react';
// import    from './../../components/Avatar/Avatar';
import {connect} from 'react-redux';
import * as actions from '../../store/actions'
import { Link } from 'react-router-dom';

import styles from './styles.module.css';
import workerCode from '../sharedWorker';

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}


function setCookie(name, value, options) {
    options = options || {};

    let expires = options.expires;

    if (typeof expires == "number" && expires) {
        let d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + "=" + value;
    for (let propName in options) {
        updatedCookie += "; " + propName;
        let propValue = options[propName];
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
        value: '',
        worker: this.getSharedWorker()
    };

    getSharedWorker () {
        const workerFile = new Blob([`(${workerCode})(self)`], {type: 'text/javascript'});
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', (event) => {
                const worker = new SharedWorker(event.target.result);
                worker.port.addEventListener('message', this.onWorkerList.bind(this));
                worker.port.start();
                window.addEventListener('beforeunload', () => {
                    worker.port.postMessage('disconnect');
                });
                res(worker);
            });
            reader.addEventListener('error', rej);
            reader.readAsDataURL(workerFile);
        });
    }

    onWorkerList (event) {
        switch (event.data.retData) {
            case 'current_user_info':
                console.log(event.data.list)
                this.props.currentUser(event.data.user_id, event.data.list.name, event.data.list.avatar, true)
                break;
            default:
                break;
        }
    }

    componentDidMount() {
        let req = {
            userId: getCookie('userID'),
            reqData: 'get_current_user_info'
        }
        this.state.worker.then((worker) => {
            worker.port.postMessage(req);
        });     
    }   

    logOut(event){
        deleteCookie('token');
        deleteCookie('userID');
    }

    render() {
        const avatarLabelURL = this.props.usr.currentUser.avatar;
        console.log(this.props.usr.currentUser);
        return (
            <nav className={styles["navbar"]}>
                <div className={styles["user"]}>
                    <img alt="" className={styles["avatar"]} src={avatarLabelURL} />
                    <div className={styles["phrase"]}>
                        <p className={styles["string"]}>Hello!</p>
                        <p className={styles["string"]}>{this.props.usr.currentUser.userName}</p>
                    </div>
                </div>
                <div id="log-out">
                    <Link to='/' onClick={(event) => this.logOut(event)}>Log Out</Link>
                </div>
            </nav>
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return    {
        usersList: (userId, name) => dispatch(actions.currentUser()),
        currentUser: (userId, userName, avatar, isAuthorized) => dispatch(actions.currentUser(userId, userName, avatar, isAuthorized))
    }
};

const mapStateToProps = state => {
    return {
        usr: state.usr
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);