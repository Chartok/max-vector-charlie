const router = require("express").Router();
const { User } = require("../../models");

// GET login page
router.get("/login", async (req, res) => {
    try {
        // If the user is already logged in, redirect the request to another route
        if (req.session.logged_in) {
            res.redirect("/");
            return;
        }
        // Otherwise, render the 'login' template
        res.render("login");
    } catch (error) {
        console.log("There was an error logging in", error);
        res.status(500).json(error);
    }
});

// GET signup page
router.get("/signup", async (req, res) => {
    try {
        // If the user is already logged in, redirect the request to another route
        if (req.session.logged_in) {
            res.redirect("/");
            return;
        }
        // Otherwise, render the 'signup' template
        res.render("signup");
    } catch (error) {
        console.log("There was an error signing up", error);
        res.status(500).json(error);
    }
});

// POST new user to the database
router.post("/signup", async (req, res) => {
    try {
        // Create a new user
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        // Set up sessions with a 'loggedIn' variable set to `true`
        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            req.session.username = newUser.username;
            res.redirect("/");
        });
    } catch (error) {
        console.log("There was an error signing up", error);
        res.status(500).json(error);
    }
});

// POST login route
router.post("/login", async (req, res) => {
    try {
        // Find the user who matches the posted username
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        // If there is no user with that username, return an error message
        if (!userData) {
            res.status(400).json({ message: "Incorrect username or password, please try again" });
            return;
        }
        // If the user is found, compare the entered password with the password hash stored in the database
        const validPassword = await userData.checkPassword(req.body.password);
        // If the passwords match, set up sessions with a 'loggedIn' variable set to `true`
        if (validPassword) {
            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;
                req.session.username = userData.username;
                res.status(200).json({ user: userData, message: "You are now logged in!" });
            });
        } else {
            res.status(400).json({ message: "Incorrect username or password, please try again" });
            return;
        }
    } catch (error) {
        console.log("There was an error logging in", error);
        res.status(500).json(error);
    }
});

// DELETE logout route
router.delete("/logout", async (req, res) => {
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
        console.log("There was an error logging out", error);
        res.status(500).json(error);
    }
});

module.exports = router;
