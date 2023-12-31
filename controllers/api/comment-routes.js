const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth')

// POST comment route
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.userData.id,
        });
        res.json(newComment);
    } catch (error) {
        console.error('There was an error creating a new comment');
    }
});

module.exports = router;
