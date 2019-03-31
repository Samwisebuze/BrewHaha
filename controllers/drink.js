/* eslint-disable spaced-comment */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const h = require('../helpers');

const Types = {
  BEER: 'beer',
  WINE: 'wine',
  SPIRIT: 'spirit',
  COCKTAIL: 'cocktail',
};

exports.drinkTypes = Types;

const Drink = mongoose.model('Drink');

//== Create ==//
// GET drink
exports.addDrink = (req, res) => {
<<<<<<< HEAD
  res.render('editDrink', {
    title: 'Add Drink',
  });
=======
  res.render('drink/editDrink', { title: 'Add Drink' });
>>>>>>> 5ecdd294095d651337ed427ee9cc38bb424500da
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
  const drink = await Drink.findOne({
    _id: req.params._id,
  });

  if (drink === null) {
    res.flash('error', 'It appears this drink doesn\'t exist. Let\'s add it!');
    res.redirect('/drinks/add');
  }
<<<<<<< HEAD

  res.render('drink', {
    title: `${drink.name}`,
    drink,
  });
=======
  res.render('drink/drink', { title: `${drink.name}`, drink });
>>>>>>> 5ecdd294095d651337ed427ee9cc38bb424500da
};
// POST
exports.updateDrink = async (req, res) => {
  const drink = await (new Drink(req.body)).save();
  res.flash('sucess', `Updated ${drink.name}`);
  req.redirect(`/drinks/${drink._id}/edit`);
};

//== read ==//

//GET - one
exports.getDrinkBySlug = async (req, res) => {
  const drink = await Drink.findOne({
    slug: req.params.slug,
  });

  if (drink == null) {
    res.flash('error', 'It appears this drink does\'t exist. Let\'s add it!');
  }

  res.render('drink', {
    title: `${drink.name}`,
    drink,
  });
};

exports.getDrinkById = async (req, res) => {
  const drink = await Drink.findOne({
    _id: req.params._id,
  });

  if (drink == null) {
    res.flash('error', 'It appears this drink does\'t exist. Let\'s add it!');
  }
<<<<<<< HEAD

  res.render('drink', {
    title: `${drink.name}`,
    drink,
  });
=======
  res.render('drink/drink', { title: `${drink.name}`, drink });
>>>>>>> 5ecdd294095d651337ed427ee9cc38bb424500da
};

function getTagSeeds(drinkType = '') {
  let tagSeed = [Types.BEER, Types.COCKTAIL, Types.SPIRIT, Types.WINE];
  // eslint-disable-next-line default-case
  switch (drinkType.toLowerCase()) {
    case Types.BEER:
      tagSeed = Types.BEER;
      break;
    case Types.WINE:
      tagSeed = Types.WINE;
      break;
    case Types.SPIRIT:
      tagSeed = Types.SPIRIT;
      break;
    case Types.COCKTAIL:
      tagSeed = Types.COCKTAIL;
      break;
  }

  return tagSeed;
}

function getAllTagDefaults(tagSeed) {
  let result = [];
  tagSeed.forEach((element) => {
    result += h.getSeedData(element).tags;
  });
  return result;
}
// GET - list
exports.getDrinks = async (req, res) => {
<<<<<<< HEAD
  const tagDefault = getAllTagDefaults(
    getTagSeeds(req.query.drinkType),
  );
  const tagsQuery = req.query.tags.split(',') || tagDefault;
  const page = req.query.page || 1;
  const limit = req.query.limit || 25;

  const drinks = await Drink.find({
    tags: {
      $in: tagsQuery,
    },
  }.paginate({
    page,
    limit,
  }));
  res.render('drinks', {
    title: 'Drinks',
    drinks,
  });
=======
  const drinks = await Drink.find();
  res.render('drink/drinks', { title: 'Drinks', drinks });
>>>>>>> 5ecdd294095d651337ed427ee9cc38bb424500da
};

// DELETE
exports.deleteDrink = async (req, res) => {
  const drink = await Drink.findOneAndDelete({
    _id: req.params._id,
  }).exec();
  if (drink == null) {
    res.flash('error', 'I\'m sorry Dave, I can\'t do that');
    res.redirect(`/drinks/${req.params._id}/edit}`);
  }
  res.flash('sucess', 'Drink deleted');
  res.redirect('drinks');
};
