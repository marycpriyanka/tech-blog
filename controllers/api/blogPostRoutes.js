const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");

// Create a new post
router.post("/", async (req, res) => {
    try {
        const newBlog = BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

        res.status(200).json(newBlog);
    }
    catch (err) {
        console.log(`Error in creating a post: ${err}`);
        res.status(500).json(err);
    }
});

// Edit a post
router.put("/:id", async (req, res) => {
    try {
        const updatedPost = BlogPost.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (updatedPost) {
            res.status(200).json(updatedPost);
        }
        else {
            res.status(404).json({ message: "No post found with the given id!"})
        }
    }
    catch (err) {
        console.log(`Error in editing a post: ${err}`);
        res.status(500).json(err);
    }
});

// Delete a post
router.delete("/:id", async (req, res) => {
    try {
        const deletedPost = BlogPost.destroy({
            where: {
                id: req.params.id
            }
        });

        if (deletedPost) {
            res.status(200).json(deletedPost);
        }
        else {
            res.status(404).json({ message: "No post found with the given id!"})
        }        
    }
    catch (err) {
        console.log(`Error in deleting a post: ${err}`);
        res.status(500).json(err);
    }
});

module.exports = router;