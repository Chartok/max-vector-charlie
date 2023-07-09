const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/api/user', userRoutes);
router.use('/api/post', postRoutes);
router.use('/api/comment', commentRoutes);

// Handlebars routes
router.get('/', async (req, res) => {
    try {
        res.render('dashboard');
    } catch (error) {
        console.log('There was an error getting to the dashboard');
        res.statusCode.json(error);
    }
});

module.exports = router;