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
        // Hash the new user's password and store the resulting hash in the database
        req.body.password = await bcrypt.hash(req.body.password, 10);
        // Set up sessions with a 'loggedIn' variable set to `true`
        const userData = await setSession(req, newUser);
        res.status(200).json({ message: 'User is registered!', userData })

    } catch (error) {
        console.error('There was an error signing up');
        throw error;
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
            throw new Error('Incorrect username or password, please try again');
        }
        // If the user is found, compare the entered password with the password hash stored in the database
        const validPassword = await bcrypt.compare(req.body.password, userData.password);

        // If the passwords match, set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (error) {
        console.error('There was an error logging in');
        throw error;
    }
});

// DELETE session route
router.delete('/logout', async (req, res) => {
    try {
        // When the user logs out, destroy the session
        if (req.session.user_id) {
            req.session.destroy(() => {
                res.status(204).end();
            });
            // Else if the user is not logged in, throw new error
        } else {
            throw new Error('You must be logged in to logout!'); 
        }
    } catch (error) {
        console.error('There was an error logging out');
        throw error;
    }
});

module.exports = router;
