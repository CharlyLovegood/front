import React, { PureComponent } from 'react';
import workerCode from '../sharedWorker';
import AuthFields from './../../components/AuthFields/AuthFields';
import { Link } from 'react-router-dom';
import * as actions from '../../store/actions';

import {connect} from 'react-redux';
import styles from './styles.module.css';
import {setCookie} from '../cookie'

class AuthWindow extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            email: '',
            password: '',
            worker: this.getSharedWorker()
        };
    }

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
            case 'user_handle_login':
                if (event.data.list.result.user_id != undefined){
                    this.props.currentUser(event.data.list.result.user_id, 'test', null, true);
                    setCookie('userID', event.data.list.result.user_id);
                    setCookie('token', event.data.list.result.token);
                    this.props.currentUser(event.data.list.result.user_id, null, null, true);
                }
                break;
            default:
                break;
        }
    }

    handleChangeEmail(event) {
        this.setState({email: event.target.value}) 
    };

    handleChangePassword(event) {
        this.setState({password: event.target.value})
    };


    handleLogin(event) {
        let req = {
            email: this.state.email,
            password: this.state.password,
            reqData: 'login_user'
        }
        this.state.worker.then((worker) => {
            worker.port.postMessage(req);
        });

    }

    render() {
        return(
                <div className={styles.authcontainer}>
                    <p>Please Log In</p>
                    <AuthFields email={this.state.email} password={this.state.password} handleChangeEmail={(event) => this.handleChangeEmail(event)}
                                                                                        handleChangePassword={(event) => this.handleChangePassword(event)}></AuthFields >
                    <Link to='/users' className={styles.button} onClick={(event) => this.handleLogin(event)}> Log in </Link>
                    <Link to='/register' className={styles.link} > Register </Link>
                    <a href='http://127.0.0.1:5000/' className={styles.google_button}> g+ </a>
                </div>
        );
    };
}
const mapDispatchToProps = (dispatch) => {
    return    {
        currentUser: (userId, userName, avatar, isAuthorized) => dispatch(actions.currentUser(userId, userName, avatar, isAuthorized))
    }
};

const mapStateToProps = state => {
    return {
        usr: state.usr
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AuthWindow);