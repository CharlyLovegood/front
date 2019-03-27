import React from 'react';
import styles from './styles.module.css';

const profileCreateChatComponent = (props) => {

  return (
    <section className={styles["profile-create-chat"]}>
      <input className={styles["input"]} placeholder="Chat name" onChange={props.handleChange} onSubmit={props.handleCreateChat} type="text" value={props.value}/>

      <button className={styles["button"]} onClick={props.handleCreateChat}>Create chat</button>
    </section>
  );
};

export default profileCreateChatComponent;