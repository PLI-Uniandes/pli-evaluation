import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
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

    handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
 
  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
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
          <h1>Todo List ({this.props.incompleteCount})</h1>
          <LoginButton currentUser={this.props.currentUser}/>
          <div className="col-md-4 pull-right">
            <label className="hide-completed">
              <input
                type="checkbox"
                readOnly
                checked={this.state.hideCompleted}
                onClick={this.toggleHideCompleted.bind(this)}
              />
              Hide Completed Tasks
            </label>
          </div>
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
        </header> 
        <ul>
          {this.renderTasks()}
        </ul>
          {this.renderUserGraph()}
      </div>
    );
  }
}

export default withTracker(() => {
  const handleUsers = Meteor.subscribe('users.all');
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
    loading: !handleUsers.ready(),
    users: Users.fetch()
  };
})(App);
