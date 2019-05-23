import * as types from './actionTypes'
import { fromJS } from 'immutable';

export const usersList = (userId, name) => ({
    type: types.USERS_LIST,
    payload: fromJS({
        userId,
        name
    })
})


export const currentUser = (userId, userName, avatar, isAuthorized) => ({
    type: types.CURRENT_USER,
    payload: {
        id: userId,
	    userName,
        avatar,
	    isAuthorized
    }
})

export const removeCurrentUser = () => ({
    type: types.REMOVE_CURRENT_USER,
    payload: {
    }
})

export const removeUsersList = () => ({
    type: types.REMOVE_USERS_LIST,
    payload: {
    }
})