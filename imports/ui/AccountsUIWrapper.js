import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Accounts } from 'meteor/accounts-base';
 
export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    let inserted = this.insertButton();
    let loop = setInterval(() => {
      if (!inserted) {
        console.log('Login services not ready');
        inserted = this.insertButton();
      } else {
        console.log('Login services ready!');
        clearInterval(loop);
      }
    }, 2500);
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  insertButton() {
    if (Accounts.loginServicesConfigured()) {
      this.view = Blaze.render(Template.loginButtons,
        ReactDOM.findDOMNode(this.refs.container));
      return true;
    }
    return false;
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}