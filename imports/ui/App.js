import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import LoginButton from "./LoginButton.js";
import Graph from "./Graph.js";
import { Users } from "../api/users.js";
import EvaluationForms from "../api/evaluationForms.js";
import { Meteor } from "meteor/meteor";
import Banner from "./Banner.js";
import Register from "./Register.js";
import EvaluationEditor from "./EvaluationEditor.js";
import { Promotions } from "../api/promotions.js";


// App component - represents the whole app
class App extends Component {
  
  constructor(props) {
    super(props);
    // Based on https://stackoverflow.com/a/46004524. Probably tech debt
    this.state = {
      inBanner: true,
      inGraph: false,
      inRegister: false,
      inEvaluation: false
    };
  }

  setComponent(component){
    console.log(component);
    const newState =  {
                        inBanner: component == "inBanner",
                        inGraph: component == "inGraph",
                        inRegister: component == "inRegister",
                        inEvaluation: component == "inEvaluation"
                      };
    if (JSON.stringify(this.state) != JSON.stringify(newState)){
      this.setState(newState);
    }
  }

  renderUserGraph(){
  return <div className="text-center">
            {!Meteor.userId()? <div className="row"><label>Por favor inicia sesión</label><LoginButton/></div> :
              this.props.loadingUsers || this.props.users.length === 0? <label>No hay usuarios</label>:
              <Graph nodes={this.props.users}/>
            }
          </div>;
  }

  renderAdminNav(){
    return <div className="col-md-7 row text-center">
            <div className="col-md-4">
              <button className="btn btn-save btn-block truncate border border-primary" onClick={() => this.setComponent("inRegister")}>
              Registro de usuarios
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-save btn-block truncate border border-primary" onClick={() => this.setComponent("inEvaluation")}>
              Formatos de evaluación 
              </button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-save btn-block truncate border border-primary" onClick={() => this.setComponent("inGraph")}>
              Usuarios
              </button>
            </div>
          </div>;
  }

  renderNav(){
    return  <nav className="navbar navbar-default">
              <div className="row container-fluid">
                <div className="col-md-2 text-center">
                <Banner id="bannerImage"
                  width="50%"
                  imageURL="https://ingenieria.uniandes.edu.co/PublishingImages/programaliderazgoingenieria/banner-general-pli.jpg"/>
                </div>
                { this.props.currentUser?
                  Roles.userIsInRole(Meteor.userId(),"admin")?
                  this.renderAdminNav()
                  :
                  <div className="col-md-7 row text-center">
                    <div className="col-md-4">
                      <button className="btn btn-save btn-block truncate border border-primary" onClick={() => this.setComponent("inGraph")}>
                      Usuarios
                      </button>
                    </div>
                  </div>
                  :
                  <div className="col-md-6 row"></div>
                }
                <LoginButton showComponent={this.setComponent.bind(this)} currentUser={this.props.currentUser}/>
              </div>
            </nav>
  }

  render() {
    const {inBanner, inGraph, inRegister, inEvaluation } = this.state;
    return (
      <>
        {this.renderNav()}
          {
           inBanner ? <Banner imageURL="https://ingenieria.uniandes.edu.co/PublishingImages/programaliderazgoingenieria/banner-general-pli.jpg"/> : 
           inGraph ? this.renderUserGraph() :
           inEvaluation ? <EvaluationEditor evaluationForms={this.props.evaluationForms} /> :
           inRegister ? <Register showComponent={this.setComponent.bind(this)} promotions={this.props.promotions}/> :
           <Banner imageURL="https://ingenieria.uniandes.edu.co/PublishingImages/programaliderazgoingenieria/banner-general-pli.jpg"/> 
          }
      </>
    );
  }
}

export default withTracker(() => {
  const handleUsers = Meteor.subscribe("users.all");
  const handleEvaluationForms = Meteor.subscribe("evaluationForms");
  const handlePromotions = Meteor.subscribe("promotions");
  return {
    currentUser: Meteor.user(),
    loadingUsers: !handleUsers.ready(),
    users: Users.fetch(),
    loadingEvaluationForms: !handleEvaluationForms.ready(),
    evaluationForms: EvaluationForms.find({}, {fields:{formJSON: 1}}).fetch(),
    loadingPromotions: !handlePromotions.ready(),
    promotions: Promotions.find({}, {fields:{emails: 1, name:1}}).fetch()
  };
})(App);
