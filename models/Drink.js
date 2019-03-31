const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const drinkSchema = new mongoose.Schema({
  name: {
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


module.exports = mongoose.model('Drink', drinkSchema);
