import React, { Component } from "react";

export default class Banner extends Component{
    
      render() {
        return (          
                <img src={this.props.imageURL}
                     width={this.props.width}
                     height={this.props.height} />
                );
      }
    }

Banner.defaultProps = {
    height: "100%",
    width: "100%"
  };
