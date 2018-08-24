import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import ReactLoading from "react-loading";
import { withAlert } from "react-alert";
import * as SurveyJSEditor from "surveyjs-editor";
import * as SurveyKo from "survey-knockout";
import "surveyjs-editor/surveyeditor.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

import "icheck/skins/square/blue.css";

import * as widgets from "surveyjs-widgets";

widgets.icheck(SurveyKo, $);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);

class EvaluationEditor extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      inList: true,
      currentEvaluation: {},
      loading: true,
      editor: null
    };
  }

  componentDidMount(){
    this.setState({loading: false});
  }

  componentDidUpdate(prevProps, prevState) {

    if(!this.state.inList){
      let editorOptions = { showJSONEditorTab: true };
      this.state.editor = new SurveyJSEditor.SurveyEditor(
        "surveyEditorContainer",
        editorOptions
      );
      this.state.editor.saveSurveyFunc = this.saveMySurvey;
      if(this.state.currentEvaluation){
        this.state.editor.text = JSON.parse(this.state.currentEvaluation.formJSON);
      }
    }
    if(this.state.loading){
      this.setState({loading: false});
    }
  }
  
  saveMySurvey = () => {
    if(this.state.currentEvaluation){
      Meteor.call("evaluationForms.updateEvaluationForm", this.state.currentEvaluation._id,
                                                          this.state.editor.text, (err, result) => {
        if (err) { this.props.alert.error(err.message); }
        else {
          this.props.alert.success("Formato editado exitosamente");
          this.setInList(true);
        }
      });
    } else {
      Meteor.call("evaluationForms.newEvaluationForm", this.state.editor.text, (err, result) => {
        if (err) { this.props.alert.error(err.message); }
        else {
          this.props.alert.success("Formato guardado exitosamente");
          this.setInList(true);
        }
      });
    }
  };
  
  setInList(inList){
    const newState =  {
                        inList,
                        editor: null
                      };
    this.setState(newState);
  }

  setCurrentEvaluation(current){
    const newState =  {
                        inList: false,
                        currentEvaluation: current,
                        loading: true
                      };
    this.setState(newState);
  }

  deleteEvaluationForm(id){
    Meteor.call("evaluationForms.deleteEvaluationForm", id, (err, result) => {
      if (err) { this.props.alert.error(err.message); }
      else {
        this.props.alert.success("Formato eliminado exitosamente");
        this.setInList(true);
      }
    });
  }

  editEvaluationForm(form){
    this.setCurrentEvaluation(form);
  }

  renderOptions(){
    return  <div className="col-md-6 row container">
              <div className="col-md-6">
                <button className="btn btn-save btn-block truncate border border-primary" onClick={() => this.setCurrentEvaluation(null)}>
                Editor de formatos
                </button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-save btn-block truncate border border-primary" onClick={() => this.setInList(true)}>
                Lista de formatos disponibles
                </button>
              </div>
            </div>;
  } 

  renderList(){
    if(this.props.evaluationForms && this.props.evaluationForms.length > 0){
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
                    this.props.evaluationForms.map((form, i) => {
                      const formJSON = JSON.parse(JSON.parse(form.formJSON));
                      return  <tr key={i}>
                                <th scope="row">{i}</th>
                                <td>{formJSON.title? formJSON.title : "Sin título"}</td>
                                <td>
                                  <button className="btn btn-info" onClick={() => {this.editEvaluationForm(form);}}>Editar</button>
                                  <button className="btn btn-danger" onClick={() => {this.deleteEvaluationForm(form._id);}}>Borrar</button>
                                </td>
                              </tr>;
                    })
                  }
              </tbody>
            </table>;
    } else {
      return <table className="table table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">No hay formularios</th>                        
                </tr>
              </thead>
            </table>;
    }
  }

  renderContent(){
    if (this.state.loading){
      return <div className="container">
                <ReactLoading type="spin" style={{margin:"auto", height:"15%", width:"15%"}} />
             </div>;
    } else if (this.state.inList){
      return  this.renderList();
    } else {
      return <div id="surveyEditorContainer" />; 
    }
  }

  render() {
    return <div>
            {this.renderOptions()}
            {this.renderContent()}
           </div>;
  }
  
}

EvaluationEditor.defaultProps = {
  evaluationForms: []
};

export default withAlert(EvaluationEditor);
