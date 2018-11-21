import { connect } from 'react-redux'
import SidebarComponent from '../components/Sidebar'
import React, { Component } from 'react';



export const Sidebar = connect((state, props) => ({
  users: state.users,
  chats: state.chats,
  show: props.show
}), {})( SidebarComponent )




// class Sidebar extends Component {
// 	consructor(props) {
// 		super(props);
// 		console.log(props);
// 	}
// 	render() {
// 		return(
// 			<SidebarComponent /> 
// 		);
// 	}
// }

// function mapStateToProps (state) {
//   return {
//     users: state.users,
//     chats: state.chats
//   }
// }

// export default connect(mapStateToProps)(Sidebar)
