var express = require('express');
var router = express.Router();

// Sample posts object (could later come from a DB or JSON file)
const posts = [

  {
    postId: '1',
    title: 'Another Post',
    content: 'Here is some _italic_ text and a [link](https://example.com).',
    date: '2024-06-25'
  },
    {
    postId: '2',
    title: 'Another Post',
    content: 'Here is some _italic_ text and a [link](https://example.com).',
    date: '2024-06-25'
  }
];

// Blog home page (list)
router.get('/', (req, res) => {
  res.render('blog', { title: 'Blog', posts: Object.values(posts) });
});

// GET single blog post
router.get('/:postId', (req, res, next) => {
  const post = posts.find(p => p.postId === req.params.postId);
  if (!post) return next(); // 404 fallback

  res.render('post', {
    title: post.title,
    pageTitle: post.title,
    post
  });
});

module.exports = router;
