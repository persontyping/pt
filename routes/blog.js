var express = require('express');
var router = express.Router();

// Sample posts object (could later come from a DB or JSON file)
const posts = [

  {
    postId: '1',
    title: 'The Big Mistake',
    excerpt: 'A post about the time I felt like I had it all',
    imageUrl: 'https://imageslot.com/v1/1080x1080?bg=ff61ad&fg=ffffff&shadow=23272f&text=%5BIMAGE%5D&filetype=png',
    content: 'Here is some _italic_ text and a [link](https://persontyping.xyz).',
    date: '2024-06-25'
  },
    {
    postId: '2',
    title: 'All the Pizza in the World',
    excerpt: 'A post about the time I felt like I had it all',
    imageUrl: 'https://imageslot.com/v1/1080x1080?bg=fcff61&fg=ffffff&shadow=23272f&text=%5BIMAGE%5D&filetype=png',
    content: 'Here is some _italic_ text and a [link](https://persontyping.xyz).',
    date: '2024-06-25'
  }
];

// Blog home page (list)
router.get('/', (req, res) => {
  res.render('blog', { title: 'The 999 News', posts: Object.values(posts) });
});

// GET single blog post
router.get('/:postId', (req, res, next) => {
  const post = posts.find(p => p.postId === req.params.postId);
  if (!post) return next(); // 404 fallback

  res.render('post', { post });
});

module.exports = router;
