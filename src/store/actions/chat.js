import * as types from './actionTypes'
import { fromJS } from 'immutable';



export const chatList = (id, topic) => ({
    type: types.CHAT_LIST,
    payload: fromJS({
        id,
        topic
    })
})


export const removeChatList = () => ({
    type: types.REMOVE_CHAT_LIST,
    payload: {
    }
})