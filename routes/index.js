const express = require('express');

const router = express.Router();
const bar = require('../controllers/bar');
const menu = require('../controllers/menu');
const drink = require('../controllers/drink');
const home = require('../controllers/home');
const user = require('../controllers/user');


const { catchErrors } = require('../handlers/errorHandlers');

// Home - Index
router.get('/', home.index);
/**
 * I GOT BARS
 */
// Bar - Get
router.get('/bars', catchErrors(bar.getBars));
router.get('/bar/:slug', catchErrors(bar.getBarBySlug));
router.get('/bar/:id', catchErrors(bar.getBarById));
// Bar - Add
router.get('/bars/add', bar.addBar);
router.post('/bars/add', catchErrors(bar.createBar));
// Bar - Edit
router.get('/bars/:id/edit', catchErrors(bar.editBar));
router.post('/bars/add/:id', catchErrors(bar.updateBar));
// Bart - Delete
router.delete('/bars/delete/:id', catchErrors(bar.deleteStore));

// Menu
// Menu - Get
router.get('/menu/:id', catchErrors(menu.getMenu));
// Menu - Create
router.get('/menus/add', menu.addMenu);
router.post('/menus/add', catchErrors(menu.postMenu));
// Menu - Edit
router.get('/menus/:id/edit', catchErrors(menu.editMenu));
router.post('/menus/:id/edit', catchErrors(menu.updateMenu));
// Menu - Delete
router.delete('/menus/:id/edit', catchErrors(menu.deleteMenu));

// Drink
// Drink - Get
router.get('/drinks/:id', catchErrors(drink.getDrinkById));
router.get('/drinks/:slug', catchErrors(drink.getDrinkBySlug));
router.get('/drinks', drink.getDrinks);
// Drink - Create
router.get('/drinks/add', drink.addDrink);
router.post('/drinks/add', catchErrors(drink.postDrink));
// Drink - Edit
router.get('/drinks/:id/edit', drink.editDrink);
router.post('/drinks/:id/edit', catchErrors(drink.postDrink));

// Drink - Delete
router.delete('/drinks/:id/delete', catchErrors(drink.deleteDrink));


// User
router.get('/login', user.getLogin);
router.post('/login', user.postLogin);
router.get('/logout', user.logout);
router.get('/forgot', user.getForgot);
router.post('/forgot', user.postForgot);
router.get('/reset/:token', user.getReset);
router.post('/reset/:token', user.postReset);
router.get('/signup', user.getSignup);
router.post('/signup', user.postSignup);

module.exports = router;
