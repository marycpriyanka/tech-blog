const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");

router.get("/", async (req, res) => {
    try {
        // Gets all posts along with the comments
        const postData = await BlogPost.findAll({
            include: [
                {
                    model: Comment
                }
            ]
        });

        // Serialize data so that tempate can read it
        const posts = postData.map(post => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(`Error in getting homepage: ${err}`);
        res.status(500).json(err);
    }
});

// Renders the login page
router.get("/login", (req, res) => {
    //If the user is already logged in, redirect to the homepage.
    if (req.session.logged_in) {
        res.redirect("/");
    }

    // Otherwise render the login page
    res.render("login");
});

module.exports = router;