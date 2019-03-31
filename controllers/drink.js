/* eslint-disable spaced-comment */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const Drink = mongoose.model('Drink');

//== Create ==//
// GET drink
exports.addDrink = (req, res) => {
  res.render('drink/editDrink', { title: 'Add Drink' });
};

// POST
exports.postDrink = async (req, res) => {
  const drink = await (new Drink(req.body)).save();
  res.flash('sucess', `Added ${drink.name}`);
  res.redirect(`/drinks/${drink.slug}`);
};

//== Edit ==//
//GET
exports.editDrink = async (req, res) => {
  const drink = await Drink.findOne({ _id: req.params._id });
  if (drink === null) {
    res.flash('error', 'It appears this drink doesn\'t exist. Let\'s add it!');
    res.redirect('/drinks/add');
  }
  res.render('drink/drink', { title: `${drink.name}`, drink });
};
// POST
exports.updateDrink = async (req, res) => {
  const drink = await (new Drink(req.body)).save();
  res.flash('sucess', `Updated ${drink.name}`);
  req.redirect(`/drinks/${drink._id}/edit`);
};

//== read ==//

//GET - one
exports.getDrink = async (req, res) => {
  const drink = await Drink.findOne({ _id: req.params._id });
  if (drink == null) {
    res.flash('error', 'It appears this drink does\'t exist. Let\'s add it!');
  }
  res.render('drink/drink', { title: `${drink.name}`, drink });
};

// GET - list
exports.getDrinks = async (req, res) => {
  const drinks = await Drink.find();
  res.render('drink/drinks', { title: 'Drinks', drinks });
};

// DELETE
exports.deleteDrink = async (req, res) => {
  const drink = await Drink.findOneAndDelete({ _id: req.params._id }).exec();
  if (drink == null) {
    res.flash('error', 'I\'m sorry Dave, I can\'t do that');
    res.redirect(`/drinks/${req.params._id}/edit}`);
  }
  res.flash('sucess', 'Drink deleted');
  res.redirect('/drinks/');
};

// flash types: sucess, error, info, warning
