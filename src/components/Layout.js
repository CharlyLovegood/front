import React from 'react';
import { Sidebar } from '../containers/Sidebar'
import { Navbar } from '../containers/Navbar'
import { MessagesList } from '../containers/MessagesList'
import { AddMessage } from '../containers/AddMessage'


const layout = (
	<div id="container">
	    <Navbar />
	  	<div id="mainbody">
		    <Sidebar />
		    <section id="main">
		        <MessagesList />
		        <AddMessage />
		    </section>
		</div>
	</div>
);
export default layout;