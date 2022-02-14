const { Schema, Types } = require("mongoose");
const moment = require("moment");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },

  reactionBody: {
    type: String,
    require: true,
    minlength: 1,
    maxlength: 280,
  },
  userName: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAt) => moment(createdAt).format('llll')
  }
},
{ 
  toJSON: {
    getters: true, 
    virtuals: true, 
  },
  id: false,
})

module.exports = reactionSchema;
