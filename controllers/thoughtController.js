const { Thought, User } = require('../models');        // IMPORT MODELS

const thoughtController = {

  getAllThoughts(req, res) {                           // FETCH ALL THOUGHTS
    Thought.find({})                                   // FIND ALL THOUGHTS
      .then(dbThoughtData => res.json(dbThoughtData))  // SEND RESPONSE IF SUCCESS
      .catch(err => res.status(500).json(err));        // HANDLE ERRORS
  },

  getThoughtById({ params }, res) {                    // FETCH THOUGHT BY ID
    Thought.findById(params.id)                        // FIND THOUGHT BY ID
      .then(dbThoughtData => {
        if (!dbThoughtData) {                          // CHECK IF THOUGHT EXISTS
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(dbThoughtData);                       // SEND RESPONSE IF SUCCESS
      })
      .catch(err => res.status(500).json(err));        // HANDLE ERRORS
  },

  createThought({ body }, res) {                       // CREATE A NEW THOUGHT
    Thought.create(body)                               // CREATE THOUGHT
      .then(dbThoughtData => res.json(dbThoughtData))  // SEND RESPONSE IF SUCCESS
      .catch(err => res.status(400).json(err));        // HANDLE ERRORS
  },

  updateThought({ params, body }, res) {               // UPDATE THOUGHT BY ID
    Thought.findByIdAndUpdate(params.id, body, { new: true, runValidators: true }) // UPDATE THOUGHT
      .then(dbThoughtData => {
        if (!dbThoughtData) {                          // CHECK IF THOUGHT EXISTS
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(dbThoughtData);                       // SEND RESPONSE IF SUCCESS
      })
      .catch(err => res.status(500).json(err));        // HANDLE ERRORS
  },

  deleteThought({ params }, res) {                     // DELETE A THOUGHT
    Thought.findByIdAndDelete(params.id)               // DELETE THOUGHT BY ID
      .then(dbThoughtData => {
        if (!dbThoughtData) {                          // CHECK IF THOUGHT EXISTS
          return res.status(404).json({ message: 'No thought found with this id!' });
        }
        res.json(dbThoughtData);                       // SEND RESPONSE IF SUCCESS
      })
      .catch(err => res.status(500).json(err));        // HANDLE ERRORS
  },

  addReaction({ params, body }, res) {                 // ADD REACTION TO THOUGHT
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {                            // CHECK IF THOUGHT EXISTS
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(dbThoughtData);                         // SEND RESPONSE IF SUCCESS
    })
    .catch(err => res.status(500).json(err));          // HANDLE ERRORS
  },

  removeReaction({ params }, res) {                    // REMOVE REACTION FROM THOUGHT
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {                            // CHECK IF THOUGHT EXISTS
        return res.status(404).json({ message: 'No thought found with this id!' });
      }
      res.json(dbThoughtData);                         // SEND RESPONSE IF SUCCESS
    })
    .catch(err => res.status(500).json(err));          // HANDLE ERRORS
  }
};

module.exports = thoughtController;                    // EXPORT CONTROLLER
