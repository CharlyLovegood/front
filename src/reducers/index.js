import { combineReducers } from 'redux'
import messages from './messages'
import users from './users'
import chats from './chats'


const chat = combineReducers({
  chats,
  messages,
  users
})




export default chat
