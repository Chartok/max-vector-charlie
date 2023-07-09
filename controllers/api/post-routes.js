const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts for dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts-admin', {
            layout: 'dashboard',
            posts,
        });
    } catch (error) {
        console.log('There was an error getting all of the posts');
        res.status(500).json(error);
    }
});

// GET a single post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        if (postData) {
            const post = postData.get({ plain: true });
            res.render('single-post', { post });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        console.log('There was an error getting the post');
        res.status(500).json(error);
    }
});

// GET edit post form
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });
        if (postData) {
            const post = postData.get({ plain: true });
            res.render('edit-post', { post });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        console.log('There was an error getting the post');
        res.status(500).json(error);
    }
});

// POST new post
router.post('/', withAuth, async (req, res) => {
    try {
        const body = req.body;
        const newPost = await Post.create({ ...body, user_id: req.session.user_id });
        res.json(newPost);
    } catch (error) {
        console.log('There was an error getting all of the posts');
        res.status(500).json(error);
    }
});

// PUT update posts
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
        console.log('There was an error updating the post');
        res.status(500).json(error);
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
        console.log('There was an error deleting the post');
        res.status(500).json(error);
    }
});

module.exports = router;
