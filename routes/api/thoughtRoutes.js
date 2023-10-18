const router = require('express').Router();    // IMPORT EXPRESS ROUTER 

const {

  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction

} = require('../../controllers/thoughtController');  // IMPORT THOUGHT CONTROLLER

// ROUTE FOR THOUGHTS, GET ALL THOUGHTS, CREATE A NEW THOUGHT
router.route('/').get(getAllThoughts).post(createThought);     

// ROUTE FOR SPECIFIC THOUGHT BY ID, GET A SINGLE THOUGHT, UPDATE A THOUGHT, DELETE A THOUGHT
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);         

// ROUTE FOR REACTIONS UNDER A THOUGHT, ADD A REACTION
router.route('/:thoughtId/reactions').post(addReaction);              

// ROUTE FOR SPECIFIC REACTION BY ID, DELETE A REACTION
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);         


module.exports = router;  // EXPORT ROUTES