const mongoose = require('mongoose');
const Bar = require('../models/Bar');

mongoose.Promise = global.Promise;

/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
  res.render('home', {
    title: 'Home',
  });
};

/**
 * GET/
 * List Home Page
 * - Authenticated Homepage
 */
exports.getHome = async (req, res) => {
  // Get All Bars
  const bars = await Bar.find().exec();
  res.render('list', {
    title: 'Bars Near You',
    bars,
  });
};
