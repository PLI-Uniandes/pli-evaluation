import React, { Component } from "react";

export default class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {name: '',
                      fileInput: React.createRef()};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({name: event.target.value});
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Carga del archivo:
                <input type="file" ref={this.fileInput} />
            </label>
            <label>
              Nombre de la promoción:
              <input type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }
