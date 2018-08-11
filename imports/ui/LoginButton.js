import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Accounts } from 'meteor/accounts-base';
 
export default class AccountsUIWrapper extends Component {
  
  login() {
    if (Accounts.loginServicesConfigured()) {
      Meteor.loginWithMicrosoft({
        redirectUrl: 'http://localhost:3000',
        loginStyle: 'redirect',
        requestOfflineToken: true,
        requestPermissions: ['User.Read'] // Permission scopes are found here: https://msdn.microsoft.com/en-us/library/hh243648.aspx
      }, function(error) {
          if (error) {
              console.error('Login failed:', error.reason || error);
          }
          else {
              console.log('Logged in!');
          }
      });
    }
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <button onClick={this.login.bind(this)}>Login</button>;
  }
}