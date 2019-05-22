import * as types from './actionTypes'

let nextMessageId = 0


export const addMessage = (id, message, author, chatId, filename, url, date) => ({
    type: types.ADD_MESSAGE,
    payload: {
        id,  //to do. add real id from back
        chatId,
        message,
        author,
        filename,
        url,
        date
    }
})


export const addEmoji = (emojiCode) => ({
    type: types.EMOJI,
    payload: {
        emojiCode
    }
})


export const removeMessage = () => ({
    type: types.REMOVE_MESSAGE,
    payload: {
    }
})


export const messageReceived = (message, author, chatId, filename, url) => ({
    type: types.MESSAGE_RECEIVED,
    payload: {
        id: nextMessageId++,
        chatId,
        message,
        author,
        filename,
        url
    }
})