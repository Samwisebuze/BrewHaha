const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: '.env' });

// Connect to our Database and handle any bad connections
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises -- enables async/await use
mongoose.connection.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!

// import all models
require('./models/User');

// Start our app!
const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    // eslint-disable-next-line no-console
    console.log(`Express running → PORT ${server.address().port}`);
});
