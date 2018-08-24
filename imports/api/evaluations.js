import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const evaluations = new Mongo.Collection('evaluations');
export default evaluations;
