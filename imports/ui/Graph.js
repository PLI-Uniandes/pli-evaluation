import React, { Component } from "react";
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from "react-vis-force";
import Modal from "react-modal";

export default class Graph extends Component{
   
    constructor(props){
        super(props);
        this.state = {
            showInfoModal: false,
            currentNode: {},
        };
    }



    onSelectNode(event, node){
        this.setState({ showInfoModal: true,
                        currentNode: node,
                      });
    }

    onCloseInfoModal(event, node){
        this.setState({ showInfoModal: false,
                        currentNode: {},
                      });
    }

    renderModal(){
        return  <Modal
                    ariaHideApp={false}
                    isOpen={this.state.showInfoModal}
                    onRequestClose={this.onCloseInfoModal}
                    style={this.props.customStyles}
                    contentLabel={this.props.contentLabel}
                    shouldCloseOnOverlayClick={true}
                >
                    <h2>Perfil</h2>
                    {
                        Object.keys(this.state.currentNode).map((key, i) => (
                            <div className="row" key={i}>
                                <strong>{key}:</strong> {this.state.currentNode[key]}
                            </div>
                            )
                        )
                    }
                    <button className="btn btn-danger pull-right" onClick={this.onCloseInfoModal.bind(this)}>Cerrar</button>
                </Modal>;
    }

    render(){
        
        return (
            <div>
                <InteractiveForceGraph
                ref={(el) => {this.network = el;}}               
                simulationOptions={{ height: this.props.height,
                                    width: this.props.width,
                                    animate: this.props.animate,
                                    alpha: this.props.alpha
                                    }}
                labelAttr="nombre"
                onSelectNode={(event, node) => {this.onSelectNode(event, node);}}
                onDeselectNode={(event, node) => {this.onCloseInfoModal(event, node);}}
                highlightDependencies
                >
                    {this.props.nodes.map((node, i) => {
                       return <ForceGraphNode key={i} node={{ id: node._id, nombre: node.profile.name,
                                                                otro:"other", radius: 10 }} fill="blue" />;
                    })}
                    {this.props.links.map((link, i) => {
                        return <ForceGraphLink key={i} link={{ source: link.source, target: link.target }} />;
                    })}
                </InteractiveForceGraph>
                {this.renderModal()}
            </div>
        );
    }
}

Graph.defaultProps = {
    nodes: [],
    links: [],
    contentLabel: "Información",
    customStyles: {
                    content : {
                                top                   : "35%",
                                left                  : "50%",
                                right                 : "auto",
                                bottom                : "auto",
                                marginRight           : "-50%",
                                transform             : "translate(-50%, -50%)"
                                }
                },
    height: 400,
    width: 600,
    animate: true,
    alpha: 0.8
  };