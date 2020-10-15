const { Schema, model, Types } = require('mongoose');
const Thought = require('./Thought.js');
const moment = require('moment');

const UserSchema = new Schema
(
  {
    // userId: {//creating custom id to avoid confusion with parent comment id
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId()
    // },
    username: {
      type: String,
      unique: [true, 'username must not match one already created'],
      required: 'username is required',
      trim: true
    },
    email: {
      type: String,
      unique: [true, 'email must not match one already created'], 
      required: [ true, 'email is required' ],
      //match: regex here
      validate: {
        validator: (email) => {
          return /[a-zA-z0-9]+@.+\..+/i.test(email);
        },
        message: props => `${props.value} is not a valid email address format. Should be similar to 'example2@mail.com' and contain only english letters and/or numbers`
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    memberSince: {
      type: Date,
      default: Date.now,
      get: memberSinceVal => moment(memberSinceVal).format('MMM DD YYYY')
    }
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

//friend count virtual
UserSchema.virtual('friendCount')
.get(function() {
  console.log("\x1b[33m", "checking user friends list", "\x1b[00m");
  console.log(this.friends);
  console.log(this.friends.length);
  return this.friends.length;
});

//thought count virtual
UserSchema.virtual('thoughtCount')
.get(function() {
  console.log("\x1b[33m", "checking user thought list", "\x1b[00m");
  console.log(this.thoughts);
  console.log(this.thoughts.length);
  return this.thoughts.length;
});

const User = model('User', UserSchema);

module.exports = User;

