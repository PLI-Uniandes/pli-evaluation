import React, { Component } from "react";

export default class Banner extends Component{
    
      render() {
        return (
          <div className="container">
            <img src={this.props.imageURL}
                 width={this.props.width} height={this.props.height} />
          </div>
        );
      }
    }

Banner.defaultProps = {
    height: "100%",
    width: "100%"
  };
