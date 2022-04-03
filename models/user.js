const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema({
  username:{
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email:{
    type: String,
    unique: true,
    required: true,
    //mongo matching validation
  },
  thoughts:{
    type: Schema.Types.ObjectId,
    ref: 'thought'
  },
  userId:{
    id: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  createdAt:{
    type: Date,
    default: Date.now,
    get: createdAtVal => moment(createdAtVal).format('"MMM Do YY"')
  },
})

const User = model('User, UserSchema');

module.exports = User;