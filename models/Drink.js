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
 * - Don't Create new models if nothing has changed
 */
drinkSchema.pre('save', async function preSave(next) {
  // No Change, skip it and stop this function from running
  if (!this.isModified('ingredients')
      || !this.isModified('distributor')
      || !this.isModified('tags')) return next();
  // If Name is Modified Then regen slug
  if (!this.isModified('slug')) {
    const slugRegExp = new RegExp(`^(${this.slug})((-[0-9]*$)?)`, 'i');
    // Find other stores with the same slug
    const stores = await this.constructor.find()
      .where('slug').equals(slugRegExp);
    if (stores.length) {
      this.slug = `${this.slug}-${stores.length + 1}`;
    }
  }
  return next();
});

module.exports = mongoose.model('Drink', drinkSchema);
