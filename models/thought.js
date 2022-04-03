const { Schema, model, Types } = require('mongoose');

const ThoughtSchema = new Schema({
  thoughtText:{
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt:{
    type: Date,
    default: Date.now,
    get: createdAtVal => moment(createdAtVal).format('"MMM Do YY"')
  },
  username:{
    type: String,
    required: true
  },
  // reactions:{}
})