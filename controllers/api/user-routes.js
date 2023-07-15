const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user to the database
router.post('/', async (req, res) => {
    try {
        // Create new user
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        // Set up sessions to save new user data
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;
            res.status(200).json({ message: 'User is registered!', newUser })
        });

    } catch (error) {
        console.error('There was an error signing up');
        console.log(res);
        
    }
});

// POST login route 
router.post('/login', async (req, res) => {
    try {
        // Find user who matches the posted username
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        // If there is no user with that username or password is incorrect, return an error message
        if (!userData) {

            res.status(400).json({ message: 'Incorrect username or password, please try again' });
            return;
        }
        // If the user is found, compare the entered password with the password hash stored in the database
        const validPassword = await checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'No account found!' });
            return;
        }
        // If the passwords match, set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (error) {
        console.error('There was an error logging in');
        
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
            // Else if the user is not logged in, throw new error
        } else {
            throw new Error('You must be logged in to logout!'); 
        }
    } catch (error) {
        console.error('There was an error logging out');
        
    }
});

module.exports = router;
