const router = require('express').Router();
const { User } = require('../../models');

// GET login page
router.get('/login', async (req, res) => {
    try {
        // If the user is already logged in, redirect the request to another route
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        // Otherwise, render the 'login' template
        res.render('login');
    } catch (error) {
        console.log('There was an error logging in', error);
        res.status(500).json(error);
    }
});

// GET signup page
router.get('/signup', async (req, res) => {
    try {
        // If the user is already logged in, redirect the request to another route
        if (req.session.logged_in) {
            res.redirect('/');
            return;
        }
        // Otherwise, render the 'signup' template
        res.render('signup');
    } catch (error) {
        console.log('There was an error signing up', error);
        res.status(500).json(error);
    }
});

// POST new user to the database
router.post('/signup', async (req, res) => {
    try {
        // Hash the new user's password and store the resulting hash in the database
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // Create a new user
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        // Set up sessions with a 'loggedIn' variable set to `true`
        const userData = await setSession(req, newUser);
        res.status(200).json({ message: 'User is registered!', userData })

    } catch (error) {
        console.log('There was an error signing up', error);
        res.status(500).json(error);
    }
});

// POST login route
router.post('/login', async (req, res) => {
    try {
        // Find the user who matches the posted username
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        // If there is no user with that username or password is incorrect, return an error message
        if (!userData || !(await bcrypt.compare(req.body.password, userData.password))) {
            res.status(401).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        // If the user is found, compare the entered password with the password hash stored in the database
        const validPassword = await bcrypt.compare(req.body.password, userData.password);

        // If the passwords match, set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ message: 'You are now logged in!' });
        });
    } catch (error) {
        console.log('There was an error logging in', error);
        res.status(500).json(error);
    }
});

// DELETE session route
router.delete('/logout', async (req, res) => {
    try {
        // When the user logs out, destroy the session
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(409).end();
        }
    } catch (error) {
        console.log('There was an error logging out', error);
        res.status(500).json(error);
    }
});

module.exports = router;
