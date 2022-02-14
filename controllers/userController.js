const { User, Thought } = require("../models");

module.exports = {
  // get all users

getAllUsers(req, res) {
  User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => console.log(error));
},

  // create a new user
  createNewUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // get single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate('thoughts')
    .populate('friends')
    .then(async (user) =>
      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json({
            user,
            user: await (req.params.userId),
          })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},

 // Update a user
 updateUser(req, res) {
  User.findOneAndUpdate({ _id: req.params.userId })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    // Add a friend to a user
    addFriend(req, res) {
      console.log('Congrats you have a new friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No user found with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

      // delete friend from a user
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friend: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
}