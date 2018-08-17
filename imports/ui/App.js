import React, { Component } from "react";
import { withTracker } from "meteor/react-meteor-data";
import LoginButton from "./LoginButton.js";
import Graph from "./Graph";
import { Users } from "../api/users";
import { Meteor } from "meteor/meteor";
import Banner from "./Banner.js";
import Register from "./Register.js";


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
              this.props.loading || this.props.users.length === 0? <label>No hay usuarios</label>:
              <Graph nodes={this.props.users}/>
            }
          </div>;
  }

  renderNav(){
    return  <nav>
              <div className="col-md-3">
              <Banner 
                width="20%"
                height="2%"
                imageURL="https://ingenieria.uniandes.edu.co/PublishingImages/programaliderazgoingenieria/banner-general-pli.jpg"/>
              </div>
              <LoginButton showComponent={this.setComponent.bind(this)} currentUser={this.props.currentUser}/>
              { this.props.currentUser?
                <div className="col-md-6">
                  <div className="col-md-4">
                    <button className="btn btn-save" onClick={()=>this.setComponent("inRegister")}>
                    Registro de usuarios
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-save" onClick={()=>this.setComponent("inEvaluation")}>
                    Formatos de evaluación 
                    </button>
                  </div>
                  <div className="col-md-4">
                    <button className="btn btn-save" onClick={()=>this.setComponent("inGraph")}>
                    Usuarios
                    </button>
                  </div>
                </div>
                :
                ""
              }
            </nav>
  }

  render() {
    const {inBanner, inGraph, inRegister, inEvaluation } = this.state;
    return (
      <>
        {this.renderNav()}
        <div className="container">
          {
           inBanner ? <Banner imageURL="https://ingenieria.uniandes.edu.co/PublishingImages/programaliderazgoingenieria/banner-general-pli.jpg"/> : 
           inGraph ? this.renderUserGraph() :
           inEvaluation ? <label>Formatos de evaluación</label> :
           inRegister ? <Register/> :
           <Banner imageURL="https://ingenieria.uniandes.edu.co/PublishingImages/programaliderazgoingenieria/banner-general-pli.jpg"/> 
          }
        </div>
      </>
    );
  }
}

export default withTracker(() => {
  const handleUsers = Meteor.subscribe("users.all");
  return {
    currentUser: Meteor.user(),
    loading: !handleUsers.ready(),
    users: Users.fetch()
  };
})(App);
