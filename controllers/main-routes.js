const router = require('express').Router();

const { Post, User, Comment } = require('../models');

// Get All posts for main page
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                User,
                {
                    model: Comment,
                    include: [User],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('all-posts', {
            layout: 'main',
            posts,
        });
    } catch (error) {
        console.log('There was an error getting all of the posts');
        res.status(500).json(error);
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
            res.statusCode.end();
        }
    } catch (error) {
        console.log('There was an error getting the post');
        res.statusCode.json(error);
    }

});