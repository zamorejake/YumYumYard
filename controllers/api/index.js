const router = require('express').Router();

const userRoutes = require('./userRoutes');
const entreeRoutes = require('./entreeRoutes');
const beverageRoutes = require('./beverageRoutes');

router.use('/users', userRoutes);
router.use('/entrees', entreeRoutes);
router.use('/beverages', beverageRoutes);


module.exports = router;
