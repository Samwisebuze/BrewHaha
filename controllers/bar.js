/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const Bar = mongoose.model('Bar');

// === CREATE ===
// GET
exports.addBar = (req, res) => {
  res.render('editBar', { title: 'Add Bar' });
};
// POST
exports.createBar = async (req, res) => {
  const bar = await (new Bar(req.body)).save();
  req.flash('success', `Successfully Created ${bar.name}. Care to leave a review?`);
  res.redirect(`/bar/${bar.slug}`);
};

// === Edit ===
// GET
exports.editBar = async (req, res) => {
  const bar = await Bar.findOne({ _id: req.params.id });
  // TODO: Confirm user owns the store
  res.render('editBar', { title: `Edit ${bar.name}`, bar });
};

// POST
exports.updateBar = async (req, res) => {
  // Set Location data to be a point
  req.body.location.type = 'Point';
  const bar = await Bar.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the newly updated store data
    runValidators: true,
  }).exec();
  req.flash('success', `Successfully updated <strong>${bar.name}</strong>. <a href="/bars /${bar.slug}">View Store</a>`);
  res.redirect(`/bars/${bar._id}/edit`);
};

// === READ ===
// GET - One
exports.getStore = async (req, res) => {
  const bar = await Bar.findOne({ slug: req.params.slug });
  if (bar === null) {
    res.flash('error', 'It appears this bar doesn\'t exist. Let\'s make one!');
    res.redirect('/bars/add');
  }
  res.render('bar', { title: `${bar.name}`, bar });
};
