const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// List all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    console.log('Retrieved posts:', posts);
    res.render('blog', { title: 'Reads', posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).send('Server error while fetching blog posts.');
  }
});

// GET single blog post by ID
router.get('/:id([0-9a-fA-F]{24})', async (req, res, next) => {
  try {
    const post = await Blog.findById(req.params.id); // ✅ fixed this line
    if (!post) return next(); // 404 if not found

    res.render('post', { post });
  } catch (err) {
    console.error('Error fetching single post:', err);
    next(err); // Pass to error handler
  }
});


module.exports = router;
