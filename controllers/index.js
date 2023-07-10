const router = require('express').Router();

const userRoutes = require('./api/user-routes');
const postRoutes = require('./api');
const commentRoutes = require('./api/comment-routes');

router.use('/api/user', userRoutes);
router.use('/api/post', postRoutes);
router.use('/api/comment', commentRoutes);

// Handlebars routes
router.get('/', async (req, res) => {
    try {
        res.render('home');
    } catch (error) {
        console.log('There was an error getting to the dashboard');
        res.statusCode.json(error);
    }
});

module.exports = router;