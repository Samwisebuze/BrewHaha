const express = require('express');

const router = express.Router();
const bar = require('../controllers/bar');
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
router.get('/add', bar.addBar);
router.post('/add', catchErrors(bar.createBar));
// Bar - Edit
router.get('/bars/:id/edit', catchErrors(bar.editBar));
router.post('/bars/add/:id', catchErrors(bar.updateBar));

// Menu

// Drink

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
