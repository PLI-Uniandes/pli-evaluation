import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const EvaluationForms = new Mongo.Collection("evaluationForms");
export default EvaluationForms;
/*
evaluationForm: {
  _id: id,
  owner: id creator,
  dateCreated: creation/edition date,
  formJSON: the evaluation form used with SurveyJS
}
*/
if (Meteor.isServer) {
    Meteor.publish("evaluationForms", function () {
      if (!this.userId) {
          return this.ready();
        }
      return EvaluationForms.find({});  
    });
}
Meteor.methods({
    "evaluationForms.newEvaluationForm": function newEvaluationForm(formJSON) {
      const loggedInUser = Meteor.user();
      if (!Roles.userIsInRole(loggedInUser, ['admin'])) { throw new Meteor.Error("Necesitas ser administrador para realizar esta acción", "Rol sin suficientes privilegios"); }
      const owner = this.userId;
      const dateCreated = new Date();
      formJSON = JSON.stringify(formJSON);
      const form = { owner, dateCreated, formJSON };
      return EvaluationForms.insert(form);
    },
    "evaluationForms.updateEvaluationForm": function updateEvaluationForm(id, formJSON) {
      const loggedInUser = Meteor.user();
      if (!Roles.userIsInRole(loggedInUser, ['admin'])) { throw new Meteor.Error("Necesitas ser administrador para realizar esta acción", "Rol sin suficientes privilegios"); }
      check(id, String);
      const evaluation = EvaluationForms.findOne(id);
      let dateCreated = new Date();
      formJSON = JSON.stringify(formJSON);
      if (!evaluation) { throw new Meteor.Error("No se puede editar el formulario", "El formulario no pudo ser encontrado."); }
      if (evaluation.owner !== this.userId) { throw new Meteor.Error("No se puede editar el formulario", "No tiene permisos para editar este formulario"); }
      EvaluationForms.update(id, { $set: { formJSON, dateCreated } });
    },
    "evaluationForms.deleteEvaluationForm": function deleteEvaluationForm(id) {
      const loggedInUser = Meteor.user();
      if (!Roles.userIsInRole(loggedInUser, ['admin'])) { throw new Meteor.Error("Necesitas ser administrador para realizar esta acción", "Rol sin suficientes privilegios"); }
      check(id, String);
      const evaluation = EvaluationForms.findOne(id);
      if (!evaluation) { throw new Meteor.Error("No se puede eliminar el formulario", "El formulario no pudo ser encontrado"); }
      if (evaluation.owner !== this.userId) { throw new Meteor.Error("No se puede eliminar el formulario", "No tiene permisos para eliminar este formulario"); }
      EvaluationForms.remove(id);
    },
    "evaluationForms.getEvaluationForm": function getEvaluationForm(id) {
      check(id, String);
      const evaluation = EvaluationForms.findOne(id);
      if (!evaluation) { throw new Meteor.Error("No se puede obtener el formulario", "El formulario no pudo ser encontrado"); }
      return { formJSON: evaluation.formJSON };
    },
  });

