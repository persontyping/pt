const express = require('express');
const router = express.Router();

// This responds to /blog/
router.get('/', (req, res) => {
  res.send('Blog home page');
});

// Example additional route: /blog/post
router.get('/post', (req, res) => {
  res.send('Blog post');
});

module.exports = router;