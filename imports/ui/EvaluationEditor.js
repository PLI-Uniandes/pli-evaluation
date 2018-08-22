import React, { Component } from "react";
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

export default class EvaluationEditor extends Component {
  editor;

  constructor(props){
    super(props);
    this.state = {
      inList: true,
      currentEvaluation: {}
    }
  }

  componentDidUpdate() {
    let editorOptions = { showEmbededSurveyTab: true };
    this.editor = new SurveyJSEditor.SurveyEditor(
      "surveyEditorContainer",
      editorOptions
    );
    this.editor.saveSurveyFunc = this.saveMySurvey;
  }
  
  saveMySurvey = () => {
    console.log(JSON.stringify(this.editor.text));
  };
  
  setInList(inList){
    const newState =  {
                        inList: inList
                      };
    this.setState(newState);
  }

  setCurrentEvaluation(current){
    const newState =  {
                        inList: false,
                        currentEvaluation: current
                      };
    this.setState(newState);
  }

  renderOptions(){
    return  <div className="col-md-6 row container">
              <div className="col-md-6">
                <button className="btn btn-save btn-block truncate" onClick={() => this.setCurrentEvaluation({})}>
                Editor de formatos
                </button>
              </div>
              <div className="col-md-6">
                <button className="btn btn-save btn-block truncate" onClick={() => this.setInList(true)}>
                Lista de formatos disponibles
                </button>
              </div>
            </div>;
  } 

  renderContent(){
    if (this.state.inList){
      return <label>In list</label>;
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
