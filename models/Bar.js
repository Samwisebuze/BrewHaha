const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const barSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: 'Please enter a bar name!',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  tags: [String],
  cost: {
    type: String,
    require: true,
  },
  menus: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu',
  }],
  reviews: [{
    rating: {
      type: Number,
      min: { type: Number, min: 1 },
      max: { type: Number, max: 5 },
      require: true,
    },
    title: String,
    body: String,
  }], // Id of Rating
  hours: [{
    day: {
      type: String,
      require: true,
    },
    open: {
      type: Date,
      require: true,
    },
    close: {
      type: Date,
      require: true,
    },
  }],
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates!',
    }],
    address: {
      type: String,
      required: 'You must supply an address!',
    },
  },
  specials: [{
    dayOfWeek: String,
    description: String,
  }],
}, {
  timestamps: true,
});

/**
 * preSave Hook
 * - Modifes bar.slug IFF name a has been modified.
 */
barSchema.pre('save', async function preSave(next) {
  // skip it and stop this function from running
  if (!this.isModified('name')) return next();

  this.slug = slug(this.name);
  const slugRegExp = new RegExp(`^(${this.slug})((-[0-9]*$)?)`, 'i');
  // Find other stores with the same slug
  const stores = await this.constructor.find()
    .where('slug').equals(slugRegExp);
  if (stores.length) {
    this.slug = `${this.slug}-${stores.length + 1}`;
  }
  return next();
});

module.exports = mongoose.model('Bar', barSchema);
