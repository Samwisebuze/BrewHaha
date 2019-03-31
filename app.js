/* eslint-disable no-console */
/**
 * Module dependencies.
 */
const express = require('express'); // Web Framework
const compression = require('compression'); // ?
const session = require('express-session'); // ? sessions allow us to have tracked interactions with users
const bodyParser = require('body-parser'); // Parses the body of an HTTP Request so we don't have to
const logger = require('morgan'); // ? Logging is cool
const chalk = require('chalk'); // ?
const lusca = require('lusca'); // ?
const dotenv = require('dotenv'); // Makes out ENV file readable like an object
const MongoStore = require('connect-mongo')(session); // ?
const flash = require('express-flash'); // Popup messages!!
const path = require('path'); // ?
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose'); // MongoDB ORM
const passport = require('passport'); // User Authentications
const expressValidator = require('express-validator'); // ?
const expressStatusMonitor = require('express-status-monitor'); // ?
const sass = require('node-sass-middleware'); // ?
const multer = require('multer'); // ? for uploads
const promisify = require('promisify');
const helpers = require('./helpers');
const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env' });

// /**
//  * API keys and Passport configuration.
//  */
// const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 7777);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// serves up static files from the public folder.
// Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Status Monitor on site
 */
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
}));

// Setup Request logging using morgan
// the input string takes pre-defined tokens or templates
app.use(logger('dev'));
// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());
// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SESSION_SECRET,
  key: process.env.SESSION_KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

// // The flash middleware let's us use req.flash('error', 'Shit!'),
// which will then pass that message to the next page the user requests
app.use(flash());

app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next();
  } else {
    lusca.csrf()(req, res, next);
  }
});
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');

// Setup Helpers
// to pass variables to our templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
app.use((req, _res, next) => {
  req.login = promisify(req.login, req);
  next();
});

app.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/chart.js/dist'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
app.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
app.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));

/**
 * Primary app routes.
 */
app.use('/', routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  if (app.get('env') === 'development') {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('%s Press CTRL-C to stop\n', chalk.red('☒'));
  }
});

module.exports = app;
