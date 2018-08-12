// To manage roles in the clients
Meteor.publish(null, function (){
    return Meteor.roles.find({}, {"profile": 1})
  })