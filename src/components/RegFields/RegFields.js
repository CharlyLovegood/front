import React from 'react';
import styles from './styles.module.css';

const RegFields = (props) => {

  return (
    <section className={styles.profile_create_chat}>
		<input onChange={props.handleChangeName} value={props.name} className={styles.input} placeholder="name" type="text"></input>
		<input onChange={props.handleChangeNick} value={props.nick} className={styles.input} placeholder="nick" type="text"></input>
		<input onChange={props.handleChangeEmail} value={props.email} className={styles.input} placeholder="email" type="text"></input>
		<input onChange={props.handleChangePassword} value={props.password} className={styles.input} placeholder="password" type="text"></input>
    </section>
  );
};

export default RegFields;




