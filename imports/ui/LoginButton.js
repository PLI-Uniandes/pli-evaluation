import React, { Component } from "react";
import { Accounts } from "meteor/accounts-base";
import { Meteor } from "meteor/meteor";
 
export default class LoginButton extends Component {
  
  constructor(props) {
    super(props);
  }

  logout(){
    const self = this;
    Meteor.logout((error) => {
      if(error){
        console.log(error);
      } else {
      }
      self.props.showComponent('inBanner');
    });
  }

  login() {
    if (Accounts.loginServicesConfigured()) {
      const self = this;
      Meteor.loginWithOffice365({
        loginStyle: "popup",
        requestOfflineToken: true,
        requestPermissions: ["User.Read"] // Permission scopes are found here: https://msdn.microsoft.com/en-us/library/hh243648.aspx
      }, function(error) {
          if (error) {
              console.error("Login failed:", error.reason || error);
              self.props.showComponent('inBanner');
          }
          else {
            console.log("Logged in!");
            //Get photo from profile
            self.props.showComponent('inGraph');
          }
      });
    }
  }

  handleLogin(){
    if(this.props.currentUser){
      return ( 
              <div className="row text-right">
                <div className="col-md-6">
                  <label>{ this.props.currentUser.profile.name }</label>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-danger" onClick={this.logout.bind(this)}>Cerrar Sesión</button> 
                </div>                
              </div>
              );
    } else {
      return ( <button className="btn btn-info" onClick={this.login.bind(this)}>Iniciar Sesión</button> );
    }
  }
 

  render() {
    // Just render a placeholder container that will be filled in
    return (
      <div className="col-md-3 text-right">{this.handleLogin()}</div>
    );
  }
}