const { Schema, model, Types } = require('mongoose');

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

})