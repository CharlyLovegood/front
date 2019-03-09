const messages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
    case 'MESSAGE_RECEIVED':
      return state.concat([
        {
          message: action.message,
          author: action.author,
          url: action.url,
          filename: action.filename,
          id: action.id
        }
      ])
    default:
      return state
  }
}

export default messages
