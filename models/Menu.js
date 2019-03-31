const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const menuSchema = new mongoose.Schema({
  type: {
    type: String,
    required: 'What type of Menu is this? Beer, Wine, Cheese?',
  },
  items: [{
    type: {
      type: String,
      required: 'What kind of drink is this menu item?',
    },
    drink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drink',
    },
    name: {
      type: String,
      required: 'Please provide the menu items name.',
    },
    price: {
      type: Number,
      required: 'Please provide the price listed on the menu.',
    },
    tags: [{
      type: String,
    }],
    rating: {
      type: Number,
      min: {
        type: Number,
        min: 1,
      },
      max: {
        type: Number,
        max: 5,
      },
    },
  }],
});

module.exports = mongoose.model('Menu', menuSchema);
