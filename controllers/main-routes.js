const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Get all posts for main page
router.get('/', async (req, res) => {
    try {
        // Wait for all posts to be retrieved from the database
        const postData = await Post.findAll({
            include: [User],
        });

        // Serialize the data so the template can read it then render it
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts', {
            posts,
        });
    } catch (error) {
        console.error('There was an error getting all of the posts for your main page');
        
    }
});

// GET a single post for main page
router.get('/post/:id', async (req, res) => {
    try {

        // Wait for the post to be retrieved from the database
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        // If the post is found, serialize the data so the template can read it then render it
        if (postData) {
            const post = postData.get({ plain: true });
            res.render('single-post', { post });
        } else {
            res.status().end();
        }
    } catch (error) {
        console.log('There was an error getting the post');
        res.status();
    }
});

// GET login page
router.get('/login', (req, res) => {
    try {
        // If the user is already logged in when the login route is accessed, redirect the request to the dashboard
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        // Otherwise, render the 'login' template
        res.render('login');
    } catch (error) {
        console.error('There was an error logging in');
        
    }
});

// GET signup page
router.get('/signup', (req, res) => {
    try {
        // If the user is already logged in when the signup route is accessed, redirect the request to the dashboard
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        // Otherwise, render the 'signup' template
        res.render('signup');
    } catch (error) {
        console.log('There was an error signing up');
        res.status();
    }
});

module.exports = router;
