import * as types from '../constants/ActionTypes'

const users = (state = [{id: 1, userName: 'Tony',isAuthorized: false}, {id: 2, userName: 'Matilda', isAuthorized: true}], action) => {
	console.log(action.type)
  switch (action.type) {
    case types.USERS_LIST:
      return state.concat([
      {
      	id: action.id,
      	userName: action.userName,
  		isAuthorized: action.isAuthorized
      }])
    case types.CURRENT_USER:
    	return action.currenUser
    default:
      return state
  }
}

export default users
