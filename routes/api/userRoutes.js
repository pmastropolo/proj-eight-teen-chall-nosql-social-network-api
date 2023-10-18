const router = require('express').Router();  // IMPORT EXPRESS ROUTER 

const {
  getAllUsers, 
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');   // IMPORT USER CONTROLLER


// GET ALL USERS AND POST (CREATE) USER
router.route('/').get(getAllUsers).post(createUser);

// ROUTES FOR SPECIFIC USER BY ID, GET, UPDATE, DELETE SINGLE USER BY ID
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// ROUTES FOR ADDING/REMOVING FRIENDS 
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);


module.exports = router;  // export router