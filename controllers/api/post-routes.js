const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new post
router.post('/', withAuth, async (req, res) => {
    try {
        const body = req.body;
        const newPost = await Post.create({ ...body, user_id: req.session.user_id });
        res.json(newPost);
    } catch (error) {
        console.error('There was an error getting all of the posts');
        throw error;
    }
});

// UPDATE posts
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
    } catch (error) {
        console.error('There was an error updating the post');
        throw error;
    }
});

// DELETE posts
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        res.json({ message: 'Post deleted', postData });
    } catch (error) {
        console.error('There was an error deleting the post');
        throw error;}
});

module.exports = router;
