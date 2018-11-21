import { connect } from 'react-redux'
import NavbarComponent from '../components/Navbar'

export const Navbar = connect(state => ({
  users: state.users
}), {})(NavbarComponent)