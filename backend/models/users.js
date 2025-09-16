const mongoose = require('mongoose');
const MessagesSchema = require('./Messages');
const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  messages: {
    type: [MessagesSchema],
    require: true,
  },
});
const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;
