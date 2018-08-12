import { Meteor } from 'meteor/meteor';
export const Users = Meteor.users;

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('users.all', function () {
    if (!this.userId) {
        return this.ready();
      }
    return Meteor.users.find({}, {"profile": 1});  
  });  
    
}