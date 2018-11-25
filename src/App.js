import React from 'react'
import './App.css'

import { Sidebar } from './containers/Sidebar'
import { Navbar } from './containers/Navbar'
import { MessagesList } from './containers/MessagesList'
import { AddMessage } from './containers/AddMessage'



import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';



const Main = () => (
  <div>
  </div>
);

const App = () => (
	<Router>
	  	<div id="container">
		  	<Navbar />
		  	<div id="mainbody">
	    		<Route exact path='/' component={ () => <Sidebar show="chats" /> }  />
	    		<Route path='/chats' component={ () => <Sidebar show="chats" /> }  />
	    		<Route path='/users' component={ () => <Sidebar show="users" /> }  />
		    	<section id="main">
		            	<Route exact path='/' component={Main} /> 
		            	<Route path='/users' component={Main} /> 
		            	<Route exact path='/chats' component={Main} /> 
			    		<Route path='/chats/chat_id=1' component={ () => <MessagesList chatid="1" /> }  />
		            	<Route path='/chats/chat_id=2' component={ () => <MessagesList chatid="2" /> }  /> 
		        	<AddMessage />
		    	</section>
			</div>
		</div>
	</Router>

)

export default App
