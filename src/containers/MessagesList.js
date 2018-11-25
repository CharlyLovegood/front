import { connect } from 'react-redux'
import MessagesListComponent from '../components/MessagesList'

export const MessagesList = connect((state, props) => ({
  messages: state.messages,
  chatid: props.chatid
}), {})(MessagesListComponent)
