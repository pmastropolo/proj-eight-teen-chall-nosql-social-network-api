const { User, Thought } = require('../models');    // IMPORT MODELS

const userController = {

  getAllUsers(req, res) {                          // FUNCTION TO FETCH ALL USERS
    User.find({})                                  // FIND ALL USERS
      .then(dbUserData => res.json(dbUserData))    // SEND RESPONSE IF SUCCESS
      .catch(err => res.status(500).json(err));    // HANDLE ERRORS
  },

  getUserById({ params }, res) {                   // FUNCTION TO FETCH USER BY ID
    User.findById(params.id)                       // FIND USER BY ID
      .populate({ path: 'thoughts', select: '-__v' }) // POPULATE THOUGHTS
      .populate({ path: 'friends', select: '-__v' }) // POPULATE FRIENDS
      .select('-__v')                              // EXCLUDE __v FIELD
      .then(dbUserData => res.json(dbUserData))    // SEND RESPONSE IF SUCCESS
      .catch(err => res.status(500).json(err));    // HANDLE ERRORS
  },

  createUser({ body }, res) {                      // FUNCTION TO CREATE A USER
    User.create(body)                              // CREATE USER
      .then(dbUserData => res.json(dbUserData))    // SEND RESPONSE IF SUCCESS
      .catch(err => res.status(400).json(err));    // HANDLE ERRORS
  },

  updateUser({ params, body }, res) {              // FUNCTION TO UPDATE USER BY ID
    User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true }) // UPDATE USER
      .then(dbUserData => {
        if (!dbUserData) {                         // CHECK IF USER EXISTS
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);                      // SEND RESPONSE IF SUCCESS
      })
      .catch(err => res.status(500).json(err));    // HANDLE ERRORS
  },

  deleteUser({ params }, res) {                    // FUNCTION TO DELETE USER
    User.findByIdAndDelete(params.userId)          // DELETE USER BY ID
      .then(dbUserData => {
        if (!dbUserData) {                         // CHECK IF USER EXISTS
          return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);                      // SEND RESPONSE IF SUCCESS
      })
      .catch(err => res.status(500).json(err));    // HANDLE ERRORS
  },

  addFriend({ params }, res) {                     // FUNCTION TO ADD FRIEND
    User.findByIdAndUpdate(
      params.userId, 
      { $push: { friends: params.friendId } }, 
      { new: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {                           // CHECK IF USER EXISTS
        res.status(404).json({ message: 'No user found with this ID!' });
        return;
      }
      res.json(dbUserData);                        // SEND RESPONSE IF SUCCESS
    })
    .catch(err => res.json(err));                  // HANDLE ERRORS
  },
    
  removeFriend({ params }, res) {                  // FUNCTION TO REMOVE FRIEND
    User.findByIdAndUpdate(
      params.userId, 
      { $pull: { friends: params.friendId } }, 
      { new: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {                           // CHECK IF USER EXISTS
        res.status(404).json({ message: 'No user found with this ID!' });
        return;
      }
      res.json(dbUserData);                        // SEND RESPONSE IF SUCCESS
    })
    .catch(err => res.json(err));                  // HANDLE ERRORS
  }
};

module.exports = userController;                   // EXPORT CONTROLLER

