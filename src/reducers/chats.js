const chats = (state = [{id: 1, chatName: 'chat 1',unread: 89}, {id: 2, chatName: 'chat 2', unread: 5}], action) => {
  switch (action.type) {
    case 'CHAT_LIST':

      return state.concat([
        {
          id: action.id,
          chatName: action.chatName,
          unread: action.unread
        }
      ])
    default:
      console.log(state);
      return state
  }
}

export default chats