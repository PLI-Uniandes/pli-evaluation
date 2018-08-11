import '../imports/api/tasks.js';
import './accounts.js';
import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  console.log('Server started');
});
