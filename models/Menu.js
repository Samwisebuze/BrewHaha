const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const menuSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  items: [{
    type: {
      type: String,
      required: true,
    },
    drink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Drink',
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
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
