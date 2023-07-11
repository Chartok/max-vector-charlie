const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for logged in users
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.userData.id,
            },
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts-admin', {
            layout: 'dashboard',
            posts,
        });
    } catch (error) {
        console.error('There was an error getting all of the posts');
        throw error;
    }
});

// GET new post page
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    });
});

// GET edit post page
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.userData.id);

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        console.error('There was an error getting the edit-post');
        throw error;
    }
});

module.exports = router;
