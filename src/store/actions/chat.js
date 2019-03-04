import * as types from './actionTypes'



export const chatList = (id, topic) => ({
  type: types.CHAT_LIST,
  payload: {
    id,
    topic
  }
})

