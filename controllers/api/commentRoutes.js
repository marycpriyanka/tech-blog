const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const comment = await Comment.create({
            comment_content: req.body.comment_content,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        });

        res.status(200).json(comment);
    }
    catch (err) {
        console.log(`Error in creating a comment: ${err}`);
        res.status(500).json(err);
    }
})

module.exports = router;