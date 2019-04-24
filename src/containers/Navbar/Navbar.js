import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import { Link } from 'react-router-dom';

import styles from './styles.module.css';
import workerCode from '../sharedWorker';

import {getCookie} from '../cookie'
import {deleteCookie} from '../cookie'


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
                console.log('usrt')
                this.props.currentUser(event.data.user_id, event.data.list.name, event.data.list.avatar, true);
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
        this.props.removeCurrentUser();
        this.props.history.push('/login');
    }

    render() {
        let avatarLabelURL = this.props.usr.currentUser.avatar;
        if (this.props.usr.currentUser.avatar == undefined) {
            avatarLabelURL = require('../../icons/user7.png');
        }
        return (
            <nav className={styles.navbar}>
                <div className={styles.user}>
                    <img alt='avatar' className={styles.avatar} src={avatarLabelURL} />
                    <div className={styles.phrase}>
                        <p className={styles.string}>Hello!</p>
                        <p className={styles.string}>{this.props.usr.currentUser.userName}</p>
                    </div>
                </div>
                <div className={styles.logo_container}>
                    <img alt='logo' className={styles.logo} src='https://cdn.dribbble.com/users/469578/screenshots/2461278/cut-sling.gif'/>
                </div>
                <div className={styles.log_out}>
                    <Link className={styles.log_out} to='/login' onClick={(event) => this.logOut(event)}>Log Out</Link>
                </div>
            </nav>
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return    {
        usersList: (userId, name) => dispatch(actions.currentUser()),
        currentUser: (userId, userName, avatar, isAuthorized) => dispatch(actions.currentUser(userId, userName, avatar, isAuthorized)),
        removeCurrentUser: () => dispatch(actions.removeCurrentUser()),
    }
};

const mapStateToProps = state => {
    return {
        usr: state.usr
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);