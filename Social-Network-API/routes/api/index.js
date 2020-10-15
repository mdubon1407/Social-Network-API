const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const thoughtRoutes = require('./thought-routes.js');

//add prefix of /users to the routes created in user-routes.js
router.use('/users', userRoutes);
//add prefix of /thoughts to the routes created in thought-routes.js
router.use('/thoughts', thoughtRoutes);

module.exports = router;