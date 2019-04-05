import React, { Component } from 'react';
import workerCode from '../sharedWorker';
import RegFields from './../../components/RegFields/RegFields';

import styles from './styles.module.css';
import {setCookie} from '../cookie'


class AuthWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nick: '',
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
            case 'user_handle_created':
                if (event.data.list.user.user_id !== undefined){
                    setCookie('userID', event.data.list.user);
                }
                break;
            default:
                break;
        }
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value}) 
    };

    handleChangeName(event) {
        this.setState({name: event.target.value}) 
    };

    handleChangeEmail(event) {
        this.setState({email: event.target.value}) 
    };

    handleChangeNick(event) {
        this.setState({nick: event.target.value}) 
    };

    handleRegistration(event) {
        let req = {
            name: this.state.name,
            nick: this.state.nick,
            email: this.state.email,
            password: this.state.password,
            reqData: 'create_user'
        }
        this.state.worker.then((worker) => {
            worker.port.postMessage(req);
        });
    }

    render() {
        return(
            <div className={styles.container}>
                <p>Registration.</p>
                <RegFields name={this.state.name} nick={this.state.nick} email={this.state.email} password={this.state.password} handleChangeName={(event) => this.handleChangeName(event)}
                                                                                                                                    handleChangeNick={(event) => this.handleChangeNick(event)}
                                                                                                                                    handleChangeEmail={(event) => this.handleChangeEmail(event)}
                                                                                                                                    handleChangePassword={(event) => this.handleChangePassword(event)}></RegFields >
                <a href="http://127.0.0.1:3000/users" className={styles.button} onClick={(event) => this.handleRegistration(event)}> Register </a>
            </div>
        );
    };
}


export default AuthWindow;