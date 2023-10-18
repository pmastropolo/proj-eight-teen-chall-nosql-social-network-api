const router = require("express").Router();       // IMPORT EXPRESS ROUTER

const thoughtRoutes = require("./thoughtRoutes");  // IMPORT THOUGHT ROUTES
const userRoutes = require("./userRoutes");        // IMPORT USER ROUTES

router.use("/thoughts", thoughtRoutes);            // SET UP THOUGHT ROUTES
router.use("/users", userRoutes);                  // SET UP USER ROUTES


module.exports = router;                           // EXPORT COMBINED ROUTES

