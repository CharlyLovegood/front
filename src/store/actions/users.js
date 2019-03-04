import * as types from './actionTypes'


export const usersList = (userId, name) => ({
  type: types.USERS_LIST,
  payload: {
    userId,
    name
  }
})


export const currentUser = (userId, userName, isAuthorized) => ({
  type: types.CURRENT_USER,
  payload: {
    id: userId,
	  userName,
	  isAuthorized
  }
})