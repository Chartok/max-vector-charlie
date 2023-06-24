const router = require("express").Router();
const { User } = require("../../models");

// Login route using session to handle user's login status
router.route("/login")
    .get(async (req, res) => {
        try {
            // Check if the user is logged in.
            if (req.session.logged_in) {
                res.redirect("/");
                return;
            }
            // If they aren't, render the login page.
            res.render("login");
        } catch (err) {
            console.log("There was an error logging in", err);
            res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            // Try to find the user by their username.
            const userData = await User.findOne({
                where: {
                    username: req.body.username,
                },
            });
            // If the username doesn't exist, send an error message.
            if (!userData) {
                res.status(400).json({
                    message: "Incorrect username or password, please try again",
                });
                return;
            }
            // If the username exists, check the password.
            const validPassword = await userData.checkPassword(req.body.password);
            // If the password is invalid, send an error message.
            if (!validPassword) {
                res.status(400).json({
                    message: "Incorrect username or password, please try again",
                });
                return;
            }
            // If the password is valid, log the user in.
            req.session.save(() => {
                req.session.userId = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;
                res.json({ user: userData, message: "You are now logged in!" });
            });
        } catch (err) {
            // If there was an error, send a 500 status code and a JSON response with the error.
            console.log("There was an error logging in", err);
            res.status(500).json(err);
        }
    });


// Sign up route
router.route("/signup")
    .get(async (req, res) => {
        try {
            // Check if the user is logged in.
            if (req.session.logged_in) {
                // If they are, redirect them to the dashboard.
                res.redirect("/dashboard");
                return;
            }
            // If they aren't, render the signup page.
            res.render("signup");
        } catch (err) {
            console.log("There was an error signing up", err);
            res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            // Try to create a new user.
            const newUser = await User.create({
                username: req.body.username,
                password: req.body.password,
            });
            // If successful, log the user in and redirect them to the dashboard.
            req.session.save(() => {
                req.session.userId = newUser.id;
                req.session.username = newUser.username;
                req.session.loggedIn = true;
                res.redirect("/dashboard");
            });
        } catch (err) {
            // If there was an error, send a 500 status code and a JSON response with the error.
            console.log("There was an error creating new user", err);
            res.status(500).json(err);
        }
    });

// Logout route
router.route('/logout').post(async (req, res) => {
    try {
        // If the user is logged in, destroy the session and log them out.
        if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
        } else {
        // If the user isn't logged in, send an error message.
        res.status(404).end()
        }
    } catch (err) {
        // If there was an error, send a 500 status code and a JSON response with the error.
        console.log('There was an error logging out', err)
        res.status(500).json(err)
    }
})


module.exports = router;
