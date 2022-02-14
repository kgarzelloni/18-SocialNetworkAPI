const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");
const moment = require("moment");

// Schema to create thoughts model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    get: (createdAt) => moment(createdAt).format("llll"),
  },

  username: {
    type: String,
    required: true,
  },

  reaction: [reactionSchema]
},
{ 
  toJSON: {
    getters: true,
  },
  id: false,
});

thoughtSchema.virtual("reactionCount").get(function () {
  return `${this.reaction.length}`;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
