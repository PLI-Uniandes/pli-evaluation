import { Meteor } from 'meteor/meteor';
export const Users = Meteor.users.find({}, {"profile": 1});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('users.all', function () {
    if (!this.userId) {
        return this.ready();
      }
    return Meteor.users.find({}, {fields:{"profile": 1}});  
  });  
    
}