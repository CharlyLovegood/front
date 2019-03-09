import { connect } from 'react-redux'
import AddMessageComponent from '../components/AddMessage'
import { addMessage } from '../actions'

const mapDispatchToProps = dispatch => ({
  dispatch: (message, author, filename, url) => {
    dispatch(addMessage(message, author, filename, url))
  }
})


export const AddMessage = connect(() => ({}), mapDispatchToProps)(AddMessageComponent)
