const router = require('express').Router();

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