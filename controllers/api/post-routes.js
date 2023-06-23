const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create user's posts
router.post('/', withAuth, async (req, res) => {
    try {
        const body = req.body;
        const newPost = await Post.create({ ...body, user_id: req.session.user_id });
        res.json(newPost);
    } catch (err) {
        console.log('There was an error getting all of the posts', err);
        res.status(500).json(err);
    }
});

// Update user's posts
router.put('/:id', withAuth, async (req, res) => {
    try {
        const body = req.body;
        const postData = await Post.update(body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        res.json(postData);
    } catch (err) {
        console.log('There was an error updating the post', err);
        res.status(500).json(err);
    }
});

// Delete user's posts
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        alert('Post deleted');
        res.json(postData);
    } catch (err) {
        console.log('There was an error deleting the post', err);
        res.status(500).json(err);
    }
});

module.exports = router;
