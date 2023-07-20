const { Schema, Model, default: mongoose } = require('mongoose');
const Movie = require('./Movie');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    watchlist: [Movie],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password on create or update
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// validate password on user login
userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// return number of saved titles
userSchema.virtual('totalSaved').get(function () {
  return this.watchlist.length;
});

// return number of following
userSchema.virtual('totalFollowing').get(function () {
  return this.following.length;
});

// return number of followers
userSchema.virtual('totalFollowers').get(function () {
  return this.followers.length;
});

// create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
