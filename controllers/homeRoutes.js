const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
    try {
        // Gets all posts
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

// Renders the login page
router.get("/login", (req, res) => {
    //If the user is already logged in, redirect to the homepage.
    if (req.session.logged_in) {
        res.redirect("/");
    }

    // Otherwise render the login page
    res.render("login");
});

// Renders the dashboard page
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render("dashboard", {
            posts,
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        console.log(`Error in rendering dashboard: ${err}`);
        res.status(500).json(err);
    }
});

// Renders the create new post page
router.get("/dashboard/newpost", withAuth, async (req, res) => {
    try {
        res.render("newPost");
    }
    catch (err) {
        console.log(`Error in rendering creat new post: ${err}`);
        res.status(500).json(err);
    }
});

// Renders the edit post page
router.get("/dashboard/:id", withAuth, async (req, res) => {
    try {
        const postData = await BlogPost.findByPk(req.params.id);

        const post = postData.get({ plain: true });

        res.render("editPost", {post, logged_in: req.session.logged_in});
    }
    catch (err) {
        console.log(`Error in rendering creat new post: ${err}`);
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
                    model: Comment,       
                    include: [
                        {
                            model: User, 
                            attributes:["name"],
                        },             
                    ]
                },
                {
                    model: User,
                    attributes:["name"]
                }
            ]
        });

        const post = postData.get({ plain: true });

        // Renders the post with the comments
        res.render("postWithComments", {
            post, 
            logged_in: req.session.logged_in
        });
    }
    catch (err) {
        console.log(`Error in getting a post: ${err}`);
        res.status(500).json(err);
    }
});

module.exports = router;