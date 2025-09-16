const mongoose = require('mongoose');
const MessagesSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
  },
  phoneNumber: {
    type: String,
    required: true,
    match: /^\+?[1-9]\d{1,14}$/,
  },
  message: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});
module.exports = MessagesSchema;
