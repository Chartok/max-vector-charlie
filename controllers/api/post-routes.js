const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// CREATE new post
router.post('/', withAuth, async (req, res) => {
    const body = req.body;
    try {
        const newPost = await Post.create({ ...body, user_id: req.session.user_id });
        res.json(newPost);
    } catch (error) {
        console.log('There was an error getting all of the posts', newPost);
        
    }
});

// UPDATE posts
router.put('/:id', withAuth, async (req, res) => {
    try {
        const [posts] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        
        if (posts > 0) {
            res.status(200).end
        } else {
            res.status(404).end();
        }
    } catch (error) {
        console.error('There was an error updating the post');
        
    }
});

// DELETE posts
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const [posts] = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        
        if (posts > 0) {
            res.status(200).end();
            console.log('The post has been deleted')
        } else {
            res.status(404).end();
        }
    } catch (error) {
        console.error('There was an error deleting the post');
        }
});

module.exports = router;
