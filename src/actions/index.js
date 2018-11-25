import * as types from '../constants/ActionTypes'

let nextMessageId = 0
let nextChatId = 0
let nextUserId = 0



export const addMessage = (message, author, filename, url) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message,
  author,
  filename,
  url
})

export const messageReceived = (message, author, filename, url) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message,
  author,
  filename,
  url
})

export const populateUsersList = users => ({
  type: types.USERS_LIST,
  users
})


export const user = (userName, isAuthorized) => ({
  type: types.CURRENT_USER,
  id: nextUserId++,
  userName,
  isAuthorized
})

export const chatList = (chatName, unread) => ({
  type: types.CHAT_LIST,
  id: nextChatId++,
  chatName,
  unread
})

