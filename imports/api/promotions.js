import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Promotions = new Mongo.Collection("promotions");
export default Promotions;
/*
promotions: {
  _id: id,
  owner: id creator,
  dateCreated: creation/edition date,
  emails: [] array of emails of the promotion
}
*/
if (Meteor.isServer) {
  Meteor.publish("promotions", function () {
    if (!this.userId) {
        return this.ready();
      }
    return Promotions.find({});  
  });
}
Meteor.methods({
    "promotions.newPromotion": function newPromotion(name, emails) {
      const loggedInUser = Meteor.user();
      if (!Roles.userIsInRole(loggedInUser, ['admin'])) { throw new Meteor.Error("Necesitas ser administrador para realizar esta acción", "Rol sin suficientes privilegios"); }
      check(name, String);
      check(emails, Array);
      const owner = this.userId;
      const simpleEmails = emails.filter(item => item.emails).map((email, i) => {
        return  email.emails;
      });
      const dateCreated = new Date();
      const promotion = { owner, dateCreated, name, emails: simpleEmails };
      return Promotions.insert(promotion);
    },
    "promotions.updatePromotion": function updatePromotion(id, name, emails) {
      const loggedInUser = Meteor.user();
      if (!Roles.userIsInRole(loggedInUser, ['admin'])) { throw new Meteor.Error("Necesitas ser administrador para realizar esta acción", "Rol sin suficientes privilegios"); }
      check(id, String);
      check(name, String);
      check(emails, Array);
      const promotion = Promotions.findOne(id);
      const dateCreated = new Date();
      if (!promotion) { throw new Meteor.Error("No se puede actualizar la promoción", "No se encontró la promoción"); }
      if (promotion.owner !== this.userId) { throw new Meteor.Error("No se puede actualizar la promoción", "No tiene permisos para editar la promoción"); }
      Promotions.update(id, { $set: { name, emails, dateCreated } });
    },
    "promotions.deletePromotion": function deletePromotion(id) {
      const loggedInUser = Meteor.user();
      if (!Roles.userIsInRole(loggedInUser, ['admin'])) { throw new Meteor.Error("Necesitas ser administrador para realizar esta acción", "Rol sin suficientes privilegios"); }
      check(id, String);
      const promotion = Promotions.findOne(id);
      if (!promotion) { throw new Meteor.Error("No se puede borrar la promoción", "No se encontró la promoción"); }
      if (promotion.owner !== this.userId) { throw new Meteor.Error("No se puede borrar la promoción", "No tiene permisos para borrar la promoción"); }
      Promotions.remove(id);
    },
    "promotions.getPromotion": function getPromotion(id) {
      check(id, String);
      const promotion = Promotions.findOne(id);
      if (!promotion) { throw new Meteor.Error("No se puede obtener la promoción", "La promoción no pudo ser encontrada"); }
      if (promotion.owner !== this.userId) { throw new Meteor.Error("No se puede obtener la promoción", "No tiene permisos para borrar la promoción"); }
      return { name: promotion.name, emails: promotion.emails };
    },
  });
