import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import LoginButton from './LoginButton.js';
import Graph from './Graph';
import { Users } from '../api/users';


// App component - represents the whole app
class App extends Component {
  
  constructor(props) {
    super(props);
    console.log(this);
    this.state = {
      hideCompleted: false,
    };
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderUserGraph(){
  return <div>{this.props.loading?<label>No hay usuarios</label>:<Graph nodes={this.props.users}/>}</div>;
  }

  render() {
    return (
      <div className="container">
        <header>
          <LoginButton currentUser={this.props.currentUser}/>
        </header>
        {this.renderUserGraph()}
      </div>
    );
  }
}

export default withTracker(() => {
  const handleUsers = Meteor.subscribe('users.all');
  return {
    currentUser: Meteor.user(),
    loading: !handleUsers.ready(),
    users: Users.fetch()
  };
})(App);
