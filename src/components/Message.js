import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'


const Message = ({ message, author, filename, url }) => {
	return (
		<p className={author}>
			<i>{author}</i> 
			{message}
			<img src={url} />
		</p>
	)
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}

export default withRouter(Message)
