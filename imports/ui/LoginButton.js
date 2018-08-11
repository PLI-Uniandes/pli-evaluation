import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
 
export default class LoginButton extends Component {
  
  logout(){
    Meteor.logout();
  }

  login() {
    if (Accounts.loginServicesConfigured()) {
      Meteor.loginWithOffice365({
        loginStyle: 'popup',
        requestOfflineToken: true,
        requestPermissions: ['User.Read', 'openid', 'profile'] // Permission scopes are found here: https://msdn.microsoft.com/en-us/library/hh243648.aspx
      }, function(error) {
          if (error) {
              console.error('Login failed:', error.reason || error);
          }
          else {
            console.log('Logged in!');
            console.log(Meteor.user());
          }
      });
    }
  }

  handleLogin(){
    console.log(Meteor.userId());
    if(Meteor.userId()){
      return ( 
              <div>
                <label>{Meteor.user()}</label>
                <button onClick={this.logout.bind(this)}>Cerrar Sesión</button> 
              </div>
              );
    } else {
      return ( <button onClick={this.login.bind(this)}>Iniciar Sesión</button> );
    }
  }
 

  render() {
    // Just render a placeholder container that will be filled in
    return (
      <div>{this.handleLogin()}</div>
    );
  }
}