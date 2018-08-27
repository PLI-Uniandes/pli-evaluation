import Papa from "papaparse";
import React, { Component } from "react";
import { withAlert } from "react-alert";

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {name: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({name: event.target.value});
      }
    
      handleSubmit(event) {   
        event.preventDefault();
        const self = this;
        Papa.parse(this.fileInput.files[0], {
          header: true,
          complete(results, file){
            Meteor.call("promotions.newPromotion", self.state.name, results.data, (err, result) => {
              if (err) { self.props.alert.error(err.message); }
              else {
                self.props.alert.info("Se creó la promoción: " + self.state.name);
              }
            });
          }
        });
      }
    
      deletePromotion(id){
        Meteor.call("promotions.deletePromotion", id, (err, result) => {
          if (err) { this.props.alert.error(err.message); }
          else {
            this.props.alert.success("Promoción eliminada exitosamente");
          }
        });
      }

      renderForm(){
        return (
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="membersFile">
                  Carga del archivo (.CSV de una columna con los emails de los miembros de la promoción):
                </label>
                <input id="memberFile" className="form-control-file" type="file"
                       ref={(ref) => this.fileInput = ref} accept=".csv" required={true} />
              </div>
              <div className="form-group">
                  <label htmlFor="promotionName">
                    Nombre de la promoción:
                  </label>
                  <input id="promotionName"  className="form-control" type="text" value={this.state.name} onChange={this.handleChange} required={true} />
                </div>
              <input type="submit" className="btn btn-primary" value="Crear promoción" />
            </form>
          </div>
        );
      }

      renderList(){
        return <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>                   
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  
                    {
                      this.props.promotions.map((prom, i) => {
                        return  <tr key={i}>
                                  <th scope="row">{i}</th>
                                  <td>{prom.name}</td>
                                  <td>
                                    <button className="btn btn-danger" onClick={() => {this.deletePromotion(prom._id);}}>Borrar</button>
                                  </td>
                                </tr>;
                      })
                    }
                </tbody>
              </table>;
      }

      render() {
        return (
          <>
            {this.renderForm()}
            {this.renderList()}
          </>
        );
      }
    }

export default withAlert(Register);