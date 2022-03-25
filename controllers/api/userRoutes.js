const router = require("express").Router();
const { User } = require("../../models");

// Create a new user
router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);

        // Sets up the sessions variable
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        })
    } catch (err) {
        console.log(`Error in creating a user: ${err}`);
        res.status(500).json(err);
    }
});

// Checks the login credentials to login
router.post("/login", async (req, res) => {
    try {
        // Search the database for a user with the provided username
        const userData = await User.findOne({ 
            where: {
                email: req.body.email 
            }
        });

        // If provided email couldnt be found
        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password, please try again"});
            return;
        }

        // Compare the provided password and hashed password in db
        const validPassword = await userData.checkPassword(req.body.password);

        // If they do not match, send error message
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect email or password, please try again"});
            return;
        }

        // If they do match and user successfully logs in, set up the sessions variable 
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "You are now logged in!" });
        });
    } catch (err) {
        console.log(`Error in logging in: ${err}`);
        res.status(500).json(err);
    }
});

// Logout
router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        // When the user logs out, destroy the session.
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;