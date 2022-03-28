const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

// Renders the dashboard page
router.get("/", withAuth, async (req, res) => {
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
router.get("/newpost", withAuth, async (req, res) => {
    try {
        res.render("newPost");
    }
    catch (err) {
        console.log(`Error in rendering creat new post: ${err}`);
        res.status(500).json(err);
    }
});

// Renders the edit post page
router.get("/:id", withAuth, async (req, res) => {
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

module.exports = router;