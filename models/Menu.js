const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const menuSchema = new mongoose.Schema({
  type: {
    type: String,
    require: true,
  },
  items: [{
    type: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
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
