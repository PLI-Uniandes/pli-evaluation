import React, { Component } from "react";

export default class Table extends Component{
    
      render() {
        return <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>                   
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                {this.props.bodyTable()}
              </table>;
      }
    }

