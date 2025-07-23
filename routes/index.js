var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "The People's Republic of Paperclips 📎" });
});

module.exports = router;
