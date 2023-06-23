const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth')

// POST comment route
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newComment);
    } catch (err) {
        console.log('There was an error creating a new comment', err);
        res.status(500).json(err);
    }
});

// DELETE comment route
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        alert('Comment deleted');
        res.json(commentData);
    } catch (err) {
        console.log('There was an error deleting the comment, comment-routes.js', err);
        res.status(500).json(err);
    }
});

module.exports = router;
