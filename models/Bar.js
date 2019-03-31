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
  menus: [Number],
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
barSchema.pre('save', function preSave(next) {
  // skip it and stop this function from running
  if (!this.isModified('name')) return next();

  this.slug = slug(this.name);
  return next();
  // TODO: Make more resilient so slugs are resilient
});

module.exports = mongoose.model('Bar', barSchema);
