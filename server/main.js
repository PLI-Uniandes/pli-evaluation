import "../imports/api/users.js";
import "../imports/api/evaluationForms.js";
import "./accounts.js";
import "./publish.js";
import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  // code to run on server at startup
  console.log("Server started");
});
