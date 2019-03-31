/* eslint-disable no-console */
require('dotenv').config({
  path: `${__dirname}/../.env`,
});

const fs = require('fs');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const Bar = require('../models/Bar');
const Menu = require('../models/Menu');
const Drink = require('../models/Menu');
const User = require('../models/User');

const bars = JSON.parse(fs.readFileSync(`${__dirname
}/data/bars.json`, 'utf-8'));
const menus = JSON.parse(fs.readFileSync(`${__dirname
}/data/menus.json`, 'utf-8'));
const drinks = JSON.parse(fs.readFileSync(`${__dirname
}/data/drinks.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname
}/data/users.json`, 'utf-8'));


async function deleteData() {
  console.log('Removing Data...');
  await Bar.remove();
  await Menu.remove();
  await Drink.remove();
  await User.remove();
  console.log('Data Removed! To load sample data run\n\n npm run sampl \n\n');
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
  }
}

if (process.argv.includes('--delete')) {
  deleteData();
} else {
  loadData();
}
