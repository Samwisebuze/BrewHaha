/* eslint-disable spaced-comment */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const Menu = mongoose.model('Menu');

//== Create ==//
// GET
exports.addMenu = async (req, res) => {
  res.render('menu/editMenu', { title: 'Add Menu' });
};

// POST
exports.postMenu = async (req, res) => {
  const menu = await (new Menu(req.body)).save();
  res.flash('sucess', 'Menu Added');
  res.redirect(`/menu/${menu.bar_id}`);
};

//== Edit ==//
// GET
exports.editMenu = async (req, res) => {
  const menu = await Menu.findOne()
    .where('_id').equals(req.params.id)
    .exec();
  if (menu == null) {
    res.redirect('/menu/add');
  }
  res.render('menu/menu', { title: `${menu.name}`, menu });
};

// POST
exports.updateMenu = async (req, res) => {
  const menu = await Menu.findOneAndUpdate({}, req.body)
    .where('_id').equals(req.params.id)
    .exec();
  if (menu == null) {
    res.flash('error', 'could not update menu');
    res.redirect(`/menu/${menu.bar_id}/edit`);
  }
  res.flash('sucess', 'Menu Updated');
  res.redirect(`/menu/${menu.bar_id}`);
};

//== read ==//

// GET
exports.getMenu = async (req, res) => {
  const menu = await Menu.findOne()
    .where('_id').equals(req.params.id)
    .populate('items.drink')
    .exec();
  if (menu == null) {
    res.flash('error', 'Sorry, it seems this menu doesn\'t exist');
    res.redirect('/home');
  }
  res.render('menu/menu', { title: 'Menu', menu });
};

//GET - List
exports.getMenus = async (req, res) => {
  const menus = await Menu.find()
    .exec();
  res.send(menus);
};

// DELETE
exports.deleteMenu = async (req, res) => {
  const menu = await Menu.findOneAndDelete()
    .where('_id').equals(req.params.id)
    .exec();
  if (menu == null) {
    res.flash('error', 'I\'m sorry Dave, I can\'t do that.');
    res.redirect(`/menu/${req.params._id}/edit`);
  }
  res.flash('sucess', 'Menu Deleted');
  res.redirect(`/bar/${menu.bar_id}`);
};
