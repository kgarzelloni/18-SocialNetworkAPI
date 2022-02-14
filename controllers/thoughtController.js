const { User, Thought, Reaction } = require("../models");

module.exports = {
  // get all thoughts

getAllThoughts(req, res) {
  Thought.find()
    .then((thought) => {
      res.json(thought);
    })
    .catch((err) => console.log(error));
},

  // create a new thought
  createNewThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        User.findOneAndUpdate({ _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }).then((dbUpdate) => {
              res.json(dbUpdate)
          })

  })

  .catch((err) => res.status(500).json(err));
},
      
  // get single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate('reaction')
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json({
              thought,
              thought: await (req.params.thoughtId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

 // Update a thought
 updateThought(req, res) {
  Thought.findOneAndUpdate({ _id: req.params.thoughtId })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
},
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

    // Add a reaction
    addReaction(req, res) {
      console.log('you have added a reaction');
      console.log(req.body);
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      )
        .then((reaction) =>
          !reaction
            ? res
                .status(404)
                .json({ message: 'No user found with that ID' })
            : res.json(reaction)
        )
        .catch((err) => res.status(500).json(err));
    },

      // delete a reaction 
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reaction: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: 'No reaction found with that ID :(' })
          : res.json(reaction)
      )
      .catch((err) => res.status(500).json(err));
  },
};
