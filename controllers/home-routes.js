const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// GET all of the posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts', { posts });
    } catch (err) {
        console.log('There was an error getting all the posts', err);
        res.status(500).json(err);
    }
});

// GET a single post
router.get('/post/:id', async (req, res) => {
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
    } catch (err) {
        console.log('There was an error getting the post', err);
    }
});

// Login route using session to handle user's login status
router.get('/login', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        res.render('login');

    } catch (err) {
        console.log('There was an error logging in', err);
        res.status(500).json(err);
    }
});

// Sign up route
router.get('/signup', async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        res.render('signup');

    } catch (err) {
        console.log('There was an error signing up', err);
        res.status(500).json(err);
    }
});

module.exports = router;
