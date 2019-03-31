const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  slug: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  tags: [{
    type: String,
  }],
  ingredients: [{
    type: String,
  }],
  distributor: {
    type: String,
    require: true,
  },
});

/**
 * preSave Hook
 * - Modifes bar.slug IFF name a has been modified.
 */
drinkSchema.pre('save', function preSave(next) {
  // skip it and stop this function from running
  if (!this.isModified('name')) return next();

  this.slug = slug(this.name);
  return next();
  // TODO: Make more resilient so slugs are resilient
});

module.exports = mongoose.model('Drink', drinkSchema);
