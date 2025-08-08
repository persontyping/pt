var express = require('express');
var router = express.Router();
const InstaPost = require('../models/Insta'); // the schema we built

/* GET photos page with demo cards */
router.get('/', async function(req, res, next) {
  try {
    // Fetch all posts to display (or limit if large)
    const instaCards = await InstaPost.find().sort({ timestamp: -1 }).lean();

    res.render('photos', { 
      title: 'TL;DR', 
      instaCards 
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
