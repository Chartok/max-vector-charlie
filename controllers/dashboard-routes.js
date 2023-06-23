const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all of the user's posts
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
    } catch (err) {
        console.log('There was an error getting all of the posts', err);
        res.status(500).json(err);
        res.redirect('login');
    }
});

// GET new post
router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard',
    });
});

// GET edit post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('edit-post', {
                layout: 'dashboard',
                post,
            });
        } else {
            console.log('There was an error, post not found', err);
            res.status(404).end();
        }
    } catch (err) {
        console.log('There was an error editing the post', err)
        res.redirect('login');
    }
});

module.exports = router;
