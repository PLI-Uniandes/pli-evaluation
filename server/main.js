import "../imports/api/users.js";
import "../imports/api/evaluationForms.js";
import "../imports/api/promotions.js";
import "./accounts.js";
import "./publish.js";
import { Meteor } from "meteor/meteor";
import { Promotions } from "../imports/api/promotions.js";

Meteor.startup(() => {
  // code to run on server at startup
  console.log("Server started");
  Meteor.users.after.insert(function (userId, user) {
    const admins = process.env.ADMIN_USERS.split(' ');
    const email = user.services.office365.userPrincipalName; 
    if(admins && email && admins.includes(email)){
      Roles.addUsersToRoles(user._id, ['admin']);
    } else if (!user.roles){
      Roles.addUsersToRoles(user._id, ['student']);
    }
  });

  userValidation = (user) => {
    const loggedInUser = Meteor.user();
    const admins = process.env.ADMIN_USERS.split(' ');
    const email = user.services.office365.userPrincipalName;
    const inPromotion = Promotions.find({ emails: email }).fetch();
    if((admins && email && admins.includes(email)) || Roles.userIsInRole(loggedInUser, ['admin']) || inPromotion.length > 0) {
      return true;
    }
    throw new Meteor.Error(403, "Sin autorización para crear nuevos usuarios o iniciar sesión");
  }
  Accounts.validateNewUser(function (user) {
    return this.userValidation(user);
  });

  Accounts.validateLoginAttempt(function(options){
    const user = options.user;
    try {
      return this.userValidation(user);
    } catch (error) {
      return false;
    }
  })
});
