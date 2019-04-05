import * as types from './actionTypes'


export const usersList = (userId, name) => ({
    type: types.USERS_LIST,
    payload: {
        userId,
        name
    }
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