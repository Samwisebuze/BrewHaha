/* eslint-disable no-console */
require('dotenv').config({
  path: `${__dirname}/../.env`,
});

const fs = require('fs');

const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const Bar = require('../models/Bar');
const Menu = require('../models/Menu');
const Drink = require('../models/Menu');
const User = require('../models/User');

const bars = JSON.parse(fs.readFileSync(`${__dirname}/Bars.json`, 'utf-8'));
const menus = JSON.parse(fs.readFileSync(`${__dirname}/Menus.json`, 'utf-8'));
const drinks = JSON.parse(fs.readFileSync(`${__dirname}/Drinks.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/Users.json`, 'utf-8'));


async function deleteData() {
  console.log('Removing Data...');
  await Bar.remove();
  await Menu.remove();
  await Drink.remove();
  await User.remove();
  console.log('Data Removed! To load sample data run\n\n npm run sample \n\n');
  process.exit();
}

async function loadData() {
  try {
    await Bar.insertMany(bars);
    await Menu.insertMany(menus);
    await Drink.insertMany(drinks);
    await User.insertMany(users);
  } catch (e) {
    console.log('\nError! If the error info is below, '
      + 'Try dropping the existing database.\\n\t run npm blowitallaway\n\n\n');

    console.log(e);
    process.exit();
  }
  process.exit();
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
