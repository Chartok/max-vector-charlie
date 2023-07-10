const router = require('express').Router();


const apiRoutes = require('./api');
const mainRoutes = require('./main-routes');


router.use('/api/', apiRoutes);
router.use('/', mainRoutes);

// Handlebars routes
router.get('/', async (req, res) => {
    try {
        res.render('dashboard', { layout: 'dashboard' });
    } catch (error) {
        console.log('There was an error getting to the dashboard');
        res.statusCode.json(error);
    }
});

module.exports = router;