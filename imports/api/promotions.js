import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Promotions = new Mongo.Collection('promotions');
export default Promotions;

Meteor.methods({
    'promotions.newPromotion': function newPromotion(name, emails) {
      check(name, String);
      check(emails, Array);
      const owner = this.userId;
      const dateCreated = new Date();
      const promotion = { owner, dateCreated, name };
      return Promotions.insert(promotion);
    },
    'promotions.updatePromotion': function updatePromotion(id, name, emails) {
      check(id, String);
      check(name, String);
      check(emails, Array);
      const promotion = Promotions.findOne(id);
      let dateCreated = new Date();
      if (!promotion) throw new Meteor.Error('Can\'t update promotion', 'Promotion couldn\'t be found.');
      if (promotion.owner !== this.userId) throw new Meteor.Error('Can\'t update promotion', 'You don\'t have permission to modify this promotion.');
      Promotions.update(id, { $set: { name, emails, dateCreated } });
    },
    'promotions.deletePromotions': function deletePromotion(id) {
      check(id, String);
      const promotion = Promotions.findOne(id);
      if (!promotion) throw new Meteor.Error('Can\'t update promotion', 'Promotion couldn\'t be found');
      if (promotion.owner !== this.userId) throw new Meteor.Error('Can\'t update promotion', 'You don\'t have permission to modify this promotion.');
      Promotions.remove(id);
    },
    'promotions.getPromotion': function getPromotion(id) {
      check(id, String);
      const promotion = Promotions.findOne(id);
      if (!promotion) throw new Meteor.Error('Can\'t get promotion', 'Promotion couldn\'t be found');
      if (promotion.owner !== this.userId) throw new Meteor.Error('Can\'t get promotion', 'You don\'t have permission to see this promotion.');
      return { name: promotion.name, emails: promotion.emails };
    },
  });
