import React from 'react';
import Aux from '../../hoc/Aux/Aux'
import classes from './Layout.module.css';
import Header from './../Header/Header'
import Navbar from './../../containers/Navbar/Navbar'


const layout = ({children}) => (
  <Aux>
    <Navbar />
    <main id="mainbody">
      {children}
    </main>
  </Aux>
);
export default layout;