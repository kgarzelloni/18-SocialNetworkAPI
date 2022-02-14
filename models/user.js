const { Schema, model } = require("mongoose");



// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: () => Promise.resolve(false),
        message: 'Email validation failed'
      }
    },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ]
  },

  { 
    toJSON: { 
      getters: true,
      virtuals: true,
    },
    
    id: false,
  }
)

userSchema.virtual("friendCount").get(function () {
  return `${this.friends.length}`;
});

const User = model("User", userSchema);

module.exports = User;
