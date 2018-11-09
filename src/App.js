import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import ToDoContainer from './containers/ToDoContainer/ToDoContainer';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';

const Chats = () => (
  <div>
    <h1>Chats</h1>
    <div className="chat-list">
      <Link to='/chats/chat_id=1'>Chat 1</Link>
      <Link to='/chats/chat_id=2'>Chat 2</Link>
    </div>
  </div>
);

const Main = () => (
  <div>
    <h1>Welcome, Friend!</h1>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Route path='/chats/chat_id=1' component={ () => <ToDoContainer id="1" /> } /> 
          <Route path='/chats/chat_id=2' component={ () => <ToDoContainer id="2" /> } /> 
          <Route path='/chats' exact component={Chats} />
          <Route path='/main' exact component={Main} />
        </Layout>
      </Router>
    );
  }
}

export default App;
