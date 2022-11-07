const router = require("express").Router();
const { Post, Comment, User } = require("../models");
// Import the custom middleware
const withAuth = require("../utils/auth");

// GET all the posts for homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post
// Use the custom middleware before allowing the user to access the posts
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        /*{
          model: Comment,
          attributes: ["content", "created_on"],
          include: [{ model: User, attributes: ["username"] }],
        },*/
      ],
    });

    const post = postData.get({ plain: true });
    res.render("post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST route to add a blog post
// CREATE new post
router.post("/post", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
      created_on: Date.now(),
    });
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT route to update the post
router.put("/post/:id", async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        // Gets a post based on the given post_id
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE route to remove the post
router.delete("/post/:id", async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to add a comment for the post
router.post("/comment", async (req, res) => {
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      created_on: Date.now(),
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT route to update the comment
router.put("/comment/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      {
        content: req.body.content,
      },
      {
        // Gets a comment based on the given comment_id
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE route to remove the comment
router.delete("/comment/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
