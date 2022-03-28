const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        // Gets all posts along with the comments
        const postData = await BlogPost.findAll();

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

// Gets one post
router.get("/:id", withAuth, async (req, res) => {
    try {
        // Gets a post by id
        const postData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: Comment
                },
                {
                    model: User
                }
            ]
        });

        const post = postData.get({ plain: true });

        const curentUserData = await User.findByPk(req.session.user_id);
        const currentUser = curentUserData.get({ plain: true });
        console.log(currentUser);

        // Renders the post with the comments
        res.render("postWithComments", {
            post, 
            username: currentUser.name,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        console.log(`Error in getting a post: ${err}`);
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