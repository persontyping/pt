var express = require('express');
var router = express.Router();

/* GET blog page. */
router.get('/blog', function(req, res, next) {
  console.log('Blog route hit'); // log
  res.render('blog', { title: 'Blog' });
});

module.exports = router;

