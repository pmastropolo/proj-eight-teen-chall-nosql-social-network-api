const router = require('express').Router();        // IMPORT EXPRESS ROUTER

const apiRoutes = require('./api');                // IMPORT API ROUTES

router.use('/api', apiRoutes);                     // API ROUTES

router.use((req, res) => res.send('Wrong route!'));// HANDLE INVALID ROUTES

module.exports = router;                           // EXPORT ROUTER
