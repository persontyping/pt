const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// List all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    console.log('Retrieved posts:', posts);
    res.render('blog', { title: 'Write Ups', posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).send('Server error while fetching blog posts.');
  }
});

// GET single blog post by ID
router.get('/:_id', async (req, res, next) => {
  try {
    const post = await Blog.findById(req.params._id);
    if (!post) return next(); // Pass to 404 handler if not found

    res.render('post', { post });
  } catch (err) {
    console.error('Error fetching single post:', err);
    next(err); // Could be an invalid ObjectId, etc.
  }
});

module.exports = router;
