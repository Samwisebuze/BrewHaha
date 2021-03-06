/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'Please provide a valid email.',
    index: true,
  },
  username: {
    type: String,
    required: true,
    unique: 'Your username must be unique to reflect who you are!',
  },
  password: {
    type: String,
    required: 'You must provide a passowrd.',
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  profile: {
    name: {
      first: {
        type: String,
        required: 'Who are you?',
      },
      last: {
        type: String,
        required: 'Who are you?',
      },
    },
    gender: String,
    location: {
      type: String,
      require: 'Please provide your home drinking zipcode!',
    },
    birthdate: {
      type: Date,
      require: 'Please enter your birthdate.',
    },
    preferences: {
      drinks: [String],
      bars: [String],
    },
    favorites: {
      drinks: [String],
      bars: [String],
    },
    roles: [{
      type: String,
      require: true,
      default: 'Drinker',
    }],
  },
}, {
  timestamps: true,
});

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  return bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    return bcrypt.hash(user.password, salt, (hash) => {
      if (err) return next(err);

      user.password = hash;
      return next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function gravatar(size = 200) {
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
