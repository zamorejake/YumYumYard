const router = require('express').Router();
const userRoutes = require('./userRoutes');
const entreeRoutes = require('./entreeRoutes');

router.use('/users', userRoutes);
router.use('/entrees', entreeRoutes);

module.exports = router;
