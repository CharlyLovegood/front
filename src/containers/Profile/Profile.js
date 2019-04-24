import React, { useState, useEffect } from 'react';
import ProfileCreateChatComponent from './../../components/ProfileCreateChatComponent/ProfileCreateChatComponent';

import styles from './styles.module.css';
import workerCode from '../sharedWorker';

import {getCookie} from '../cookie'



function Profile(props) {
	const [value, setValue] = useState('');
	const handleChange = (event) => {
		setValue(event.target.value);
	}

	const [userProfile, setUserProfile] = useState([]);
    useEffect (() => {
		let req = {
			userId: props.match.params.user_id,
			reqData: 'get_user_info'
		};
		sharedWorker.then((worker) => {
			worker.port.postMessage(req);
		});	
	}, [props.match.params.user_id]);

	const onWorkerList  = (event) => {
		switch (event.data.retData) {
			case 'user_info':
				setUserProfile([event.data.list.name, event.data.list.user_id, event.data.list.avatar]);
				break;
			default:
				break;
		}
	};

	const getSharedWorker = () => {
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
	};

	const sharedWorker = getSharedWorker();


	const handleCreateChat = (event) => {
		if (value !== '') {
			event.preventDefault();
			let userId = getCookie('userID');

			let req1 = {
				topic: value,
				userIdReciever: userId,
				userIdSender: props.match.params.user_id,
				reqData: 'create_chat'
			}

			sharedWorker.then((worker) => {
				worker.port.postMessage(req1);
			});

			setValue('');		
		}
	}


	const alternativeURL = 'https://cdn.dribbble.com/users/31664/screenshots/3225538/dribbble-meetup-mnemonic.gif';
	return(
	    <section className={styles.profile}>	
	    	<img alt='' className={styles.avatar} src={alternativeURL} />
	        <h3>{userProfile[0]}</h3>
	        <ProfileCreateChatComponent value={value} handleCreateChat={(event) => handleCreateChat(event)} 
	        													 handleChange={(event) => handleChange(event)}/>
	    </section>
	);
} 

export default Profile;