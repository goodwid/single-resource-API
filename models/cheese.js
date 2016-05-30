const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Cheese', new Schema( {
  name: {
    type: String,
    required: true
  },
  milk: {
    type: String,
    required: true,
    enum: ['cow','sheep','goat','yak']
  },
  region: {
    type: String,
    required: true
  },
  moisture: {
    type: String
  }

},{
  timestamps: true
}));
