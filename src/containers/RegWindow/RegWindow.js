import React, { useState } from 'react';
import workerCode from '../sharedWorker';
import RegFields from './../../components/RegFields/RegFields';

import styles from './styles.module.css';
import {setCookie} from '../cookie'


function AuthWindow() {
    const [name, setName] = useState('');
    const [nick, setNick] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onWorkerList =  (event) => {
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

    const getSharedWorker =  () => {
        const workerFile = new Blob([`(${workerCode})(self)`], {type: 'text/javascript'});
        return new Promise((res, rej) => {
            const reader = new FileReader();
            reader.addEventListener('loadend', (event) => {
                const worker = new SharedWorker(event.target.result);
                worker.port.addEventListener('message', onWorkerList.bind(this));
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

    const sharedWorker = getSharedWorker();


    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeName = (event) => {
        setName(event.target.value); 
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value); 
    };

    const handleChangeNick = (event) => {
        setNick(event.target.value); 
    };

    const handleRegistration = (event) => {
        let req = {
            name: name,
            nick: nick,
            email: email,
            password: password,
            reqData: 'create_user'
        }
        sharedWorker.then((worker) => {
            worker.port.postMessage(req);
        });
    }

    return(
        <div className={styles.container}>
            <p>Registration.</p>
            <RegFields name={name} nick={nick} email={email} password={password} handleChangeName={(event) => handleChangeName(event)}
                                                                                handleChangeNick={(event) => handleChangeNick(event)}
                                                                                handleChangeEmail={(event) => handleChangeEmail(event)}
                                                                                handleChangePassword={(event) => handleChangePassword(event)}></RegFields >
            <a href='http://127.0.0.1:3000/login' className={styles.button} onClick={(event) => handleRegistration(event)}> Register </a>
        </div>
    );
}


export default AuthWindow;




