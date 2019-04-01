const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const drinkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please provide a name.',
  },
  slug: String,
  type: {
    type: String,
    required: 'Please select a type.',
  },
  tags: [{
    type: String,
  }],
  ingredients: [{
    type: String,
  }],
  distributor: {
    type: String,
    required: 'Please list the distributor.',
  },
});

/**
 * preSave Hook
 * - Modifys drink.slug IFF name a has been modified.
 * - Don't Create new models if nothing has changed
 */
drinkSchema.pre('save', async function preSave(next) {
  // If edit slug IFF name is added/changed
  if (!this.isModified('slug')) {
    this.slug = slug(this.name);
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
