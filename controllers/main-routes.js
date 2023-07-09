const router = require('express').Router();

const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

// Get posts for main page
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
        console.log('There was an error getting all of the posts', error);
        res.status(500).json(error);
    }
});