import React from 'react';

const profileCreateChatComponent = (props) => {

  return (
    <section id="profile-create-chat">
      <input onChange={props.handleChange} onSubmit={props.handleCreateChat} type="text" value={props.value}/>

      <button onClick={props.handleCreateChat}>Create chat</button>
    </section>
  );
};

export default profileCreateChatComponent;