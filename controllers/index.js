const router = require('express').Router();


const apiRoutes = require('./api');
const mainRoutes = require('./main-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');


router.use('/api/', apiRoutes);
router.use('/', mainRoutes);
router.use('/dashboard', dashboardRoutes)

module.exports = router;